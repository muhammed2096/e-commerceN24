import joi from 'joi'

const addProductVal = joi.object({
    title: joi.string().min(2).max(300).trim().required(),
    description: joi.string().min(10).max(1500).trim().required(),
    price: joi.number().min(0).required(),
    priceAfterDiscount: joi.number().min(0).required(),
    sold: joi.number().min(0).optional(),
    quantity: joi.number().min(0).optional(),
    category: joi.string().hex().length(24).required(),
    subcategory: joi.string().hex().length(24).required(),
    createdBy: joi.string().hex().length(24).optional(),
    brand: joi.string().hex().length(24).optional(),
    imgCover: joi.array().items(joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(5242880).required()
    })).required(),
    images: joi.array().items(joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(5242880).required()
    })).required(),
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})
const updateProductVal = joi.object({
    title: joi.string().min(2).max(100).trim(),
    id: joi.string().hex().length(24).required(),
    imageCover: joi.array().items(joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(5242880).required()
    })).optional(),
    images: joi.array().items(joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(5242880).required()
    })).optional(),
    description: joi.string().min(10).max(1500).trim().optional(),
    price: joi.number().min(0).optional(),
    priceAfterDiscount: joi.number().min(0).optional(),
    sold: joi.number().min(0).optional(),
    quantity: joi.number().min(0).optional(),
    category: joi.string().hex().length(24).optional(),
    subCategory: joi.string().hex().length(24).optional(),
    createdBy: joi.string().hex().length(24).optional(),
    brand: joi.string().hex().length(24).optional()
})
export {
    addProductVal,
    paramsIdVal,
    updateProductVal
}