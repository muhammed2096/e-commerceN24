import joi from 'joi'

const addReviewVal = joi.object({
    text: joi.string().min(2).max(300).trim().required(),
    product: joi.string().hex().length(24).required(),
    rate: joi.number().min(0).max(5).required()
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})
const updateReviewVal = joi.object({
    id: joi.string().hex().length(24).required(),
    text: joi.string().min(2).max(300).trim().optional(),
    product: joi.string().hex().length(24).optional(),
    rate: joi.number().min(0).max(5).optional()
})
export {
    addReviewVal,
    paramsIdVal,
    updateReviewVal
}