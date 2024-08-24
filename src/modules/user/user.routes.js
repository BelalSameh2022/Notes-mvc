import { Router } from "express";
import * as UC from "./user.controllers.js";

const userRouter = Router();

userRouter.get("/", UC.signup);
userRouter.post("/handleSignup", UC.handleSignup);
userRouter.get("/login", UC.login);
userRouter.post("/handleLogin", UC.handleLogin);
userRouter.get("/logout", UC.logout);

export default userRouter;