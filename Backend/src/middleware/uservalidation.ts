import Joi from 'joi'
import { Request, Response, NextFunction } from 'express';

export  const uservalidation = (req: Request, res: Response, next: NextFunction) => {
    const {first_name, last_name, dob, mobile, address} = req.body;
    const Schema = Joi.object({
    
        //  username: Joi.string().alphanum().min(3).max(30).required(),
        // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        dob: Joi.date().required(),
        mobile: Joi.string().pattern(new RegExp('^[0-9]{10,15}$')).required(),
        address: Joi.string().max(100).required(),
    });

    const {error} = Schema.validate({first_name, last_name, dob, mobile, address});
    if (error) {
        console.log("Error in user validation middleware",error.details[0]?.message);
        return res.status(400).json({error: error.details[0].message});
    }else {
        next();
    }       
};

