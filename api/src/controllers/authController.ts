require("dotenv").config();
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { validateRegister } from "../utils/validate";

const handleNewUser = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  const { error } = validateRegister(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const findMail = await User.findOne({ where: { email } });

  if (findMail)
    return res.status(409).json({ message: "This email already exists." });

  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPwd, username });
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Password and email are required" });

  const user = await User.findOne({ where: { email } });

  if (!user)
    return res.status(401).json({ message: "We could not find this user" });

  const matchPwd = await bcrypt.compare(password, user.password);

  if (!matchPwd) return res.status(401).json({ message: "Bad password" });

  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "1d" }
  );

  user.token = refreshToken;
  await user.save();

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken, email, username: user.username, userId: user.id });
};

const handleRefresh = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(403);
  const refreshToken = cookies.jwt;

  const user = await User.findOne({ where: { token: refreshToken } });

  if (!user) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!,
    (err: any, decoded: any) => {
      if (err) return res.sendStatus(403);
      const accessToken = jwt.sign(
        { userId: decoded.userId },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "15m" }
      );
      res.json({
        accessToken,
        email: user.email,
        username: user.username,
        id: user.id,
      });
    }
  );
};

const handleLogout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ where: { token: refreshToken } });
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
  }
  foundUser!.token = undefined;
  await foundUser.save();
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  return res.sendStatus(204);
};

export { handleNewUser, handleLogin, handleRefresh, handleLogout };
