import { Router } from "express";
import { authenMiddleware } from "../loginMiddleware/authMiddleware";
import { loginUser } from "../Controller/Login-Logout/loginController";
import { logoutUserController } from "../Controller/Login-Logout/logoutController";
import { resetPasswordController } from "../Controller/Login-Logout/resetPassword";
const loginRouter = Router();
const logoutRouter = Router();
// user login
loginRouter.post("/", loginUser);
// logout

logoutRouter.post("/", logoutUserController);

export { loginRouter, logoutRouter };
