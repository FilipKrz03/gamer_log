require("dotenv").config();
import User from "../models/User";
import UserGames from "../models/UserGames";
import bcrypt from "bcrypt";
import { Response } from "express";
import { validateNewGame } from "../utils/validate";
import UserWishes from "../models/UserWishes";
import UserPreferences from "../models/UserPreferences";
import { IGetUserId } from "../middleware/verifyJWT";

const addGameToUsersGames = async (req: IGetUserId, res: Response) => {
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

const addGameToUsersWishes = async (req: IGetUserId, res: Response) => {
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

const checkIfGameIsOnTheList = async (req: IGetUserId, res: Response) => {
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

const removeGameFromUserGames = async (req: IGetUserId, res: Response) => {
  const { gameId } = req.body;
  const userId = req.userId;
  if (!gameId || !userId) return res.sendStatus(403);
  await UserGames.destroy({
    where: { UserId: userId, gameId },
  });
  res.status(200).json({ message: "Game delated" });
};

const removeGameFromUserWishes = async (req: IGetUserId, res: Response) => {
  const { gameId } = req.body;
  const userId = req.userId;
  if (!gameId || !userId) return res.sendStatus(403);
  await UserWishes.destroy({
    where: { UserId: userId, gameId },
  });
  res.status(200).json({ message: "Game delated" });
};

const handleChangePassword = async (req: IGetUserId, res: Response) => {
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
const handleChangeUsername = async (req: IGetUserId, res: Response) => {
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

const addUserPreferences = async (req: IGetUserId, res: Response) => {
  const userId = req.userId!;
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

const getUserPreferences = async (req: IGetUserId, res: Response) => {
  const userId = req.userId;

  const preferences = await UserPreferences.findOne({
    where: { UserId: userId },
  });

  if (!preferences) return res.sendStatus(204);

  return res.status(200).json({ preferences });
};

const editUserPreferences = async (req: IGetUserId, res: Response) => {
  const userId = req.userId;
  const { genres, platforms, tags } = req.body;
  if (!genres || !platforms || !tags) return res.sendStatus(400);

  const stringifyGenres = JSON.stringify(genres);
  const strinigfyPlatforms = JSON.stringify(platforms);
  const stringifyTags = JSON.stringify(tags);

  const preferences = await UserPreferences.findOne({
    where: { UserId: userId },
  });
  if (!preferences) return res.sendStatus(403);
  await preferences.update({
    genres: stringifyGenres,
    platforms: strinigfyPlatforms,
    tags: stringifyTags,
  });
  res.status(200).json({ message: "Preferences update" });
};

export {
  addGameToUsersGames,
  addGameToUsersWishes,
  checkIfGameIsOnTheList,
  removeGameFromUserGames,
  removeGameFromUserWishes,
  handleChangePassword,
  handleChangeUsername,
  addUserPreferences,
  getUserPreferences,
  editUserPreferences,
};
