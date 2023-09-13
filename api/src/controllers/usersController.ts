require("dotenv").config();
import User from "../models/User";
import UserGames from "../models/UserGames";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { validateNewGame, validateRegister } from "../utils/validate";
import UserWishes from "../models/UserWishes";
import UserPreferences from "../models/UserPreferences";
import { Json } from "sequelize/types/utils";

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

const addGameToUsersGames = async (req: any, res: Response) => {
  const { gameId } = req.body;
  const userId = req.userId;

  const { error } = validateNewGame(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const duplicateGame = await UserGames.findOne({
    where: { gameId, UserId: userId },
  });
  if (duplicateGame)
    return res.status(409).json({ message: "Game already in your games" });

  await UserGames.create({
    ...req.body,
    UserId: userId,
  });
  res.status(200).json({ message: "Game added!" });
};

const addGameToUsersWishes = async (req: any, res: Response) => {
  const { gameId } = req.body;
  const userId = req.userId;

  const { error } = validateNewGame(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const duplicateGame = await UserWishes.findOne({
    where: { gameId, UserId: userId },
  });
  if (duplicateGame)
    return res.status(409).json({ message: "Game already in your games" });

  await UserWishes.create({
    ...req.body,
    UserId: userId,
  });
  res.status(200).json({ message: "Game added!" });
};

const checkIfGameIsOnTheList = async (req: any, res: Response) => {
  const userId = req.userId;
  console.log("USER ID ", userId);
  const { gameId } = req.body;
  if (!gameId || !userId) return res.sendStatus(403);
  let isOnTheGameList = false;
  let isOnTheWishList = false;
  const searchGameInGames = await UserGames.findOne({
    where: { UserId: userId, gameId },
  });
  searchGameInGames?.gameId ? (isOnTheGameList = true) : false;

  const searchGameInWishes = await UserWishes.findOne({
    where: { UserId: userId, gameId },
  });
  searchGameInWishes?.gameId ? (isOnTheWishList = true) : false;

  res.status(200).json({ isOnTheGameList, isOnTheWishList });
};

const removeGameFromUserGames = async (req: any, res: Response) => {
  const { gameId } = req.body;
  const userId = req.userId;
  if (!gameId || !userId) return res.sendStatus(403);
  await UserGames.destroy({
    where: { UserId: userId, gameId },
  });
  res.status(200).json({ message: "Game delated" });
};

const removeGameFromUserWishes = async (req: any, res: Response) => {
  const { gameId } = req.body;
  const userId = req.userId;
  if (!gameId || !userId) return res.sendStatus(403);
  await UserWishes.destroy({
    where: { UserId: userId, gameId },
  });
  res.status(200).json({ message: "Game delated" });
};

const handleChangePassword = async (req: any, res: Response) => {
  const { password, newPassword } = req.body;
  const userId = req.userId;
  if (!password || !newPassword) return res.sendStatus(401);

  const user = await User.findOne({ where: { id: userId } });
  if (!user)
    return res.status(401).json({ message: "We could not find this user" });

  const matchPwd = await bcrypt.compare(password, user.password);
  if (!matchPwd) return res.status(401).json({ message: "Bad password" });

  const hashedNewPwd = await bcrypt.hash(newPassword, 10);
  user.password = hashedNewPwd;
  await user.save();

  res.status(200).json({ message: "Password changed" });
};
const handleChangeUsername = async (req: any, res: Response) => {
  const { password, newUsername } = req.body;
  const userId = req.userId;
  if (!password || !newUsername) return res.sendStatus(401);

  const user = await User.findOne({ where: { id: userId } });
  if (!user)
    return res.status(401).json({ message: "We could not find this user" });

  const matchPwd = await bcrypt.compare(password, user.password);
  if (!matchPwd) return res.status(401).json({ message: "Bad password" });

  user.username = newUsername;
  await user.save();

  res.status(200).json({ message: "Username Changed" });
};

const addUserPreferences = async (req: any, res: Response) => {
  const userId = req.userId;
  const { genres, platforms, tags } = req.body;
  if (!genres || !platforms || !tags) return res.sendStatus(400);

  const user = await User.findOne({ where: { id: userId } });
  if (!user)
    return res.status(401).json({ message: "We could not find this user" });

  const stringifyGenres = JSON.stringify(genres);
  const strinigfyPlatforms = JSON.stringify(platforms);
  const stringifyTags = JSON.stringify(tags);

  await UserPreferences.create({
    genres: stringifyGenres,
    platforms: strinigfyPlatforms,
    tags: stringifyTags,
    UserId: userId,
  });

  res.status(200).json({ message: "Preferences added" });
};

const getUserPreferences = async (req: any, res: Response) => {
  const userId = req.userId;

  const preferences = await UserPreferences.findOne({
    where: { UserId: userId },
  });

  if (!preferences) return res.sendStatus(204);

  return res.status(200).json({ preferences });
};

export {
  handleNewUser,
  handleLogin,
  handleRefresh,
  addGameToUsersGames,
  addGameToUsersWishes,
  checkIfGameIsOnTheList,
  removeGameFromUserGames,
  removeGameFromUserWishes,
  handleLogout,
  handleChangePassword,
  handleChangeUsername,
  addUserPreferences,
};
