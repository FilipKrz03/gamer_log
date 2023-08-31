require("dotenv").config();
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { validateRegister } from "../utils/validate";

const handleNewUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { error } = validateRegister(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const findMail = await User.findOne({ where: { email } });

  if (findMail)
    return res.status(409).json({ message: "This email already exists" });

  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPwd });
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

  if (!user) return res.sendStatus(401);

  const matchPwd = await bcrypt.compare(password, user.password);

  if (!matchPwd) return res.sendStatus(401);

  const accesToken = jwt.sign(
    { email: email },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { email: email },
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
  res.json({ accesToken, email });
};

export { handleNewUser, handleLogin };
