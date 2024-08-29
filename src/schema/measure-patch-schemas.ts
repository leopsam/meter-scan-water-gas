import Joi from 'joi';

export const measurePatshSchema = Joi.object({
  measure_uuid: Joi.string().required(),
  confirmed_value: Joi.number().integer().required(),
});
