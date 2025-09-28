import Joi from 'joi'
import { Request, Response, NextFunction } from 'express';

export  const adminValidation = (req: Request, res: Response, next: NextFunction) => {
    const {username, password} = req.body;
    const Schema = Joi.object({
    
          username: Joi.string().required(),
          password: Joi.string().min(6).required(),
       
    });

    const {error} = Schema.validate({username, password});
    if (error) {
        console.log("Error in admin validation middleware",error.details[0]?.message);
        return res.status(400).json({error: error.details[0].message});
    }else {
        next();
    }       
};

