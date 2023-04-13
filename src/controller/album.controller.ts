import { IAlbum } from './../protocols';
import { Request, Response } from 'express';
import albumService from 'services/album.service';


async function create(req: Request, res: Response) {
    const album = req.body as IAlbum;
    try{
        await albumService.create(album)
        res.sendStatus(201)
    }catch(err){
        res.status(500).send(err.message)
    }
}

async function get(_req: Request, res: Response) {
    try{
        const users = await albumService.get()
        res.status(200).send(users)
    }catch(err){
        res.status(500).send(err.message)
    }
}


export default {
    create,
    get
}