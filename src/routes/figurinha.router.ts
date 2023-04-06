import { validateSchema } from 'middlewares/validateSchema.middleware';
import { figurinhaSchema, trocaSchema } from './../schemas/figurinha.schema';
import { Router } from "express";
import figurinhaController from 'controller/figurinha.controller';

const figurinhaRouter = Router();

figurinhaRouter.post('/figurinha/new', validateSchema(figurinhaSchema), figurinhaController.create)
figurinhaRouter.get('/figurinha', figurinhaController.get)
figurinhaRouter.post('/troca', validateSchema(trocaSchema), figurinhaController.trade)
figurinhaRouter.delete('/figurinha',  validateSchema(figurinhaSchema), figurinhaController.lost)

export default figurinhaRouter;