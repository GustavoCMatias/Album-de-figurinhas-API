import joi from "joi"

export const figurinhaSchema = joi.object({
    numero: joi.number().integer().min(0).required(),
    quantidade: joi.number().integer().min(0).required(),
    userId: joi.number().integer().min(0).required(),
    albumId: joi.number().integer().min(0).required()  
})

export const trocaSchema = joi.object({
    user1: joi.object({
        numero: joi.number().integer().min(0).required(),
        quantidade: joi.number().integer().min(0).required(),
        albumId: joi.number().integer().min(0).required(),
        userId: joi.number().integer().min(0).required(),
    }),
    user2: joi.object({
        numero: joi.number().integer().min(0).required(),
        quantidade: joi.number().integer().min(0).required(),
        albumId: joi.number().integer().min(0).required(),
        userId: joi.number().integer().min(0).required(),
    })
})