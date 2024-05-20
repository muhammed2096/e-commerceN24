import joi from 'joi'

const addToCartVal = joi.object({
    product: joi.string().hex().length(24).required(),
    quantity:joi.number().integer().options({convert:false}).optional()
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})
const updateQTYVal = joi.object({
    id: joi.string().hex().length(24).required(),
    quantity:joi.number().integer().options({convert:false}).required()
})
export {
    addToCartVal,
    paramsIdVal,
    updateQTYVal
}