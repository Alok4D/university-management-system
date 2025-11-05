import { ZodObject, ZodRawShape } from 'zod';
import { Request, Response, NextFunction } from 'express';

// generic function to validate any zod schema object
const validateRequest = (schema: ZodObject<ZodRawShape>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
