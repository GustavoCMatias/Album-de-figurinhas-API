import { userSchema } from './../schemas/user.schema';
import { validateSchema } from 'middlewares/validateSchema.middleware';
import { Router } from "express";
import userController from 'controller/user.controller';

const userRouter = Router();

userRouter.post('/user', validateSchema(userSchema), userController.create)
userRouter.get('/user', userController.get)

export default userRouter;