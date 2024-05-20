import joi from 'joi'

const addAddressVal = joi.object({
    street:joi.string().trim().required(),
    phone:joi.string().trim().required(),
    city:joi.string().trim().required(),
    zip:joi.number().required()
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})
const updateAddressVal = joi.object({
    id: joi.string().hex().length(24).required(),
    street:joi.string().trim(),
    phone:joi.string().trim(),
    city:joi.string().trim(),
    zip:joi.number()
})
export {
    addAddressVal,
    paramsIdVal,
    updateAddressVal
}