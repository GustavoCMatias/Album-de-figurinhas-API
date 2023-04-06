import { FigurinhaBody, Figurinha } from './../protocols';
import { Request, Response } from 'express';
import figurinhaService from '../services/figurinha.service';


async function create(req: Request, res: Response) {
    const figurinhaList = req.body as Figurinha;
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

export default {
    create,
    get
}