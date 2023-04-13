import { ITrocaBody, IFigurinha } from './../protocols';
import { Request, Response } from 'express';
import figurinhaService from '../services/figurinha.service';


async function create(req: Request, res: Response) {
    const figurinhaList = req.body as IFigurinha;
    try{
        await figurinhaService.create(figurinhaList)
        res.sendStatus(201)
    }catch(err){
        res.status(500).send(err.message)
    }
}

async function get(_req: Request, res: Response) {
    try{
        const listFigurinha = await figurinhaService.get()
        res.status(200).send(listFigurinha)
    }catch(err){
        res.status(500).send(err.message)
    }
}

async function trade(req: Request, res: Response) {
    const {user1, user2}: ITrocaBody = req.body
    try{
        await figurinhaService.trade(user1, user2)
        res.sendStatus(201)
    }catch(err){
        res.status(500).send(err.message)
    }
}

async function lost(req: Request, res: Response)  {
    const figurinhaPerdida = req.body as IFigurinha

    try{
        await figurinhaService.lost(figurinhaPerdida)
        res.sendStatus(201)
    }catch(err){
        res.status(500).send(err.message)
    }
}

export default {
    create,
    get,
    trade,
    lost
}