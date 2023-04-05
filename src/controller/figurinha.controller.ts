import { FigurinhaBody } from './../protocols';
import { Request, Response } from 'express';
import figurinhaService from '../services/figurinha.service';


async function create(req: Request<{}, {}, FigurinhaBody>, res: Response) {
    const {figurinhaList} = req.body
    try{
        figurinhaService.create(figurinhaList)
    }catch(err){
        res.status(500).send(err.message)
    }
}