import joi from 'joi'

const addBrandVal = joi.object({
    name: joi.string().min(2).max(100).trim().required(),
    image: joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(5242880).required()
    }).required()
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})
const updateBrandVal = joi.object({
    name: joi.string().min(2).max(100).trim(),
    id: joi.string().hex().length(24).required(),
    image: joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/jepg', 'image/png', 'image/jpg').required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(5242880).required()
    })
})
export {
    addBrandVal,
    paramsIdVal,
    updateBrandVal
}