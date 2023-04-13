import { albumSchema } from './../schemas/album.schema';
import { validateSchema } from 'middlewares/validateSchema.middleware';
import { Router } from "express";
import albumController from 'controller/album.controller';

const albumRouter = Router();

albumRouter.post('/album', validateSchema(albumSchema), albumController.create)
albumRouter.get('/album', albumController.get)

export default albumRouter;