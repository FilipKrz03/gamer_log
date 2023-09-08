import Joi from "joi";
import { Request } from "express";

export const validateRegister = (data: Request) => {
  const schema = Joi.object({
    email: Joi.string()
      .pattern(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      .required(),
    password: Joi.string().min(6).required(),
    username: Joi.string().min(3).required(),
  });
  return schema.validate(data);
};

export const validateNewGame = (data: Request) => {
  const schema = Joi.object({
    gameId: Joi.number().required(),
    title: Joi.string().required(),
    image: Joi.string().required(),
    hasPc: Joi.boolean().required(),
    hasXbox: Joi.boolean().required(),
    hasPlayStation: Joi.boolean(),
    genre: Joi.string().required(),
    rating: Joi.number().required(),
  });
  return schema.validate(data);
};
