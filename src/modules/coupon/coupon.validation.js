import joi from 'joi'

const addCouponVal = joi.object({
    code: joi.string().min(2).max(20).trim().required(),
    discount: joi.number().min(0).required(),
    expires: joi.date().required()
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})
const updateCouponVal = joi.object({
    id: joi.string().hex().length(24).required(),
    code: joi.string().min(2).max(20).trim(),
    discount: joi.number().min(0),
    expires: joi.date()
})
export {
    addCouponVal,
    paramsIdVal,
    updateCouponVal
}