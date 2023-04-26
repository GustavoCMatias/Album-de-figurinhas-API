import { Request, Response, NextFunction } from 'express';
import { IUser } from 'protocols';
import userService from 'services/user.service';


async function create(req: Request, res: Response, next: NextFunction) {
    const user = req.body as IUser;
    try{
        const newUser = await userService.create(user)
        res.status(201).send(newUser);
    }catch(err){
        next(err);
    }
}

async function get(_req: Request, res: Response, next: NextFunction) {
    try{
        const users = await userService.get()
        res.status(200).send(users)
    }catch(err){
        next(err);
    }
}


export default {
    create,
    get
}