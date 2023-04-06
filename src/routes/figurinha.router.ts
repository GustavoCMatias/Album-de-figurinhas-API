import { Router } from "express";
import figurinhaController from 'controller/figurinha.controller';


const figurinhaRouter = Router();

figurinhaRouter.post('/figurinha/new', figurinhaController.create)

export default figurinhaRouter;