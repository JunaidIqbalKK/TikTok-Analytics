import { Router } from "express";

import { signUpUser, signInUser } from "../controllers/user_controller.js";
import { validateSignUpUser } from "../middlewares/user_validators/validateSignUpUser.js";
import { validateSignInUser } from "../middlewares/user_validators/validateSignInUser.js";

const routerUser = Router();

routerUser.post("/api/user/signup", validateSignUpUser, signUpUser);

routerUser.post("/api/user/signin", validateSignInUser, signInUser);

export default routerUser;
