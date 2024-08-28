import Joi from 'joi';

export const measureSchema = Joi.object({
  image: Joi.string()
    .base64({ paddingRequired: true })
    .required()
    .label('image'),
  customer_code: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .label('Customer Code'),
  measure_datetime: Joi.date().iso().required().label('Measure Datetime'),
  measure_type: Joi.string()
    .valid('WATER', 'GAS')
    .required()
    .label('Measure Type'),
});
