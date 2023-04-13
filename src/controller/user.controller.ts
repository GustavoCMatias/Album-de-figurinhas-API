import { Request, Response } from 'express';
import { IUser } from 'protocols';
import userService from 'services/user.service';


async function create(req: Request, res: Response) {
    const user = req.body as IUser;
    try{
        await userService.create(user)
        res.sendStatus(201)
    }catch(err){
        res.status(500).send(err.message)
    }
}

async function get(_req: Request, res: Response) {
    try{
        const users = await userService.get()
        res.status(200).send(users)
    }catch(err){
        res.status(500).send(err.message)
    }
}


export default {
    create,
    get
}