import joi from 'joi'

const addSubCategoryVal = joi.object({
    name: joi.string().min(2).max(100).trim().required(),
    category: joi.string().hex().length(24).required()
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})
const updateSubCategoryVal = joi.object({
    id: joi.string().hex().length(24).required(),
    name: joi.string().min(2).max(100).trim(),
    category: joi.string().hex().length(24)
})
export {
    addSubCategoryVal,
    paramsIdVal,
    updateSubCategoryVal
}