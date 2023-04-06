import joi from "joi"

export const figurinhaSchema = joi.object({
    numero: joi.number().integer().min(0).required(),
    quantidade: joi.number().integer().min(0).required() 
})

export const trocaSchema = joi.object({
    numero: joi.number().integer().min(0).required(),
    quantidade: joi.number().integer().min(0).required()
})