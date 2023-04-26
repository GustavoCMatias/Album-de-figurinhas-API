import { NextFunction } from 'express';
import { IAlbum } from './../protocols';
import { Request, Response } from 'express';
import albumService from 'services/album.service';


async function create(req: Request, res: Response, next: NextFunction) {
    const album = req.body as IAlbum;
    try{
        const newAlbum = await albumService.create(album);
        res.status(201).send(newAlbum);
    }catch(err){
        next(err);
    }
}

async function get(_req: Request, res: Response, next: NextFunction) {
    try{
        const users = await albumService.get()
        res.status(200).send(users)
    }catch(err){
        next(err);
    }
}


export default {
    create,
    get
}