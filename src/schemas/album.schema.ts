import joi from "joi"

export const albumSchema = joi.object({
    nome: joi.string().max(50).required()
})
