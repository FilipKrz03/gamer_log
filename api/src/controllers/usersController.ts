import User from "../models/User";
import bcrypt from "bcrypt";
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

export {handleNewUser}