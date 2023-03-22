import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HTTP_STATUS_BAD_REQUEST } from '../utils/serverCodes';

export const validateFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HTTP_STATUS_BAD_REQUEST).json(errors);
  }
  next();
};
