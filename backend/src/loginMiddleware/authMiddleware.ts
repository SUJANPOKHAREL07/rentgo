import { Request, Response, NextFunction } from "express";
import { generateAccessToken, verifyRefreshToken } from "./jwtToken";
import { EXPIRE_ACCESS_TOKEN } from "./expireTime";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId:number |string;
      role:'user'| 'admin'
    };
  }
}

async function authenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accessTokenCookie = req.cookies["access_token"];
    const refreshTokenCookie = req.cookies["refresh_token"];
    const authHeader = req.headers.authorization;

    let token = accessTokenCookie || (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader);
    let payload: any = null;

    if (token) {
      try {
        payload = verifyRefreshToken(token);
      } catch (err) {
        payload = null;
      }
    }

    if (!payload && refreshTokenCookie) {
      try {
        payload = verifyRefreshToken(refreshTokenCookie);
        if (payload) {
          const isProduction = process.env.NODE_ENV === "production";
          const newAccessToken = generateAccessToken({
            userId: payload.userId,
            role: payload.role,
          });
          res.cookie("access_token", newAccessToken, {
            path: "/",
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            expires: new Date(Date.now() + EXPIRE_ACCESS_TOKEN * 1000),
          });
        }
      } catch (err) {
        payload = null;
      }
    }

    if (!payload) {
      res.status(401).json({
        message: "Authentication token not found or invalid",
      });
      return;
    }

    req.user = {
      userId: payload.userId,
      role: payload.role,
    };
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Unauthorized access" });
    return;
  }
}
export {authenMiddleware}