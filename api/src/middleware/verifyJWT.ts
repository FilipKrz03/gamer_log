require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface IGetUserId extends Request {
  userId?: number;
}

const verifyJwt = (req: IGetUserId, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!,
    (err: any, decoded: any) => {
      if (err) return res.sendStatus(403);
      req.userId = decoded.userId;
      next();
    }
  );
};

export default verifyJwt;
