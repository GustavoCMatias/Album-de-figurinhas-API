import joi from "joi"

export const userSchema = joi.object({
    username: joi.string().max(20).required()
})
