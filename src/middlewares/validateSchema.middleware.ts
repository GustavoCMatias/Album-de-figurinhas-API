import { NextFunction, Request, Response } from "express";
import joi from "joi"


export function validateSchema(schema: joi.Schema){
    return (req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req.body, {abortEarly: false});
        
        if(error){
            const err = error.details.map((detail) => detail.message);
            return res.status(422).send(err);
        }

        next();
    };
}