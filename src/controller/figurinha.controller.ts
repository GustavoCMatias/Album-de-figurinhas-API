import { ITrocaBody, IFigurinha } from './../protocols';
import { NextFunction, Request, Response } from 'express';
import figurinhaService from '../services/figurinha.service';


async function create(req: Request, res: Response, next: NextFunction) {
    const figurinhaList = req.body as IFigurinha;
    try{
        const result = await figurinhaService.create(figurinhaList)
        res.status(201).send(result)
    }catch(err){
        next(err);
    }
}

async function get(_req: Request, res: Response, next: NextFunction) {
    try{
        const listFigurinha = await figurinhaService.get()
        res.status(200).send(listFigurinha)
    }catch(err){
        next(err);
    }
}

async function trade(req: Request, res: Response, next: NextFunction) {
    const {user1, user2}: ITrocaBody = req.body
    try{
        await figurinhaService.trade(user1, user2)
        res.sendStatus(201)
    }catch(err){
        next(err);
    }
}

async function lost(req: Request, res: Response, next: NextFunction)  {
    const figurinhaPerdida = req.body as IFigurinha

    try{
        const result = await figurinhaService.lost(figurinhaPerdida)
        res.status(201).send(result)
    }catch(err){
        next(err);
    }
}

export default {
    create,
    get,
    trade,
    lost
}