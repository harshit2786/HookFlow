import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET ?? "";

interface JwtPayload {
  id: string;
  email : string
}

export const middlewareFunc = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
     res.status(401).json({ message: "Authorization header is missing" });
     return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
