import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS_UNAUTHORIZED } from '../utils/serverCodes';
import { UserModel } from '../models/user.model';
import { IRequest, IJwtPayload } from '../interfaces/server.interface';

export const validateJWT = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const SECRET_KEY = process.env.SECRET_KEY as string;
  const token: string | undefined = req.header('x-token');

  if (!token) {
    return res.status(HTTP_STATUS_UNAUTHORIZED).json({
      msg: 'There is not token in the request',
    });
  }

  try {
    const { uid } = jwt.verify(token, SECRET_KEY) as IJwtPayload;

    const user = await UserModel.findById(uid);

    if (!user) {
      return res.status(HTTP_STATUS_UNAUTHORIZED).json({
        msg: 'user dont exist',
      });
    }

    if (!user?.active) {
      return res.status(HTTP_STATUS_UNAUTHORIZED).json({
        msg: 'invalid token',
      });
    }

    req.user = user;

    next();
  } catch (e) {
    console.error(e);
    res.status(HTTP_STATUS_UNAUTHORIZED).json({
      msg: 'invalid token',
    });
  }
};
