import Joi from "joi";

const timeRegex = /([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?/;

export const createShiftPublishDto = Joi.object({
  date: Joi.date().required(),
});
