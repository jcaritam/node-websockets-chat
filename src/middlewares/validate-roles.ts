import { NextFunction, Response } from 'express';
import { IRequest } from '../interfaces/server.interface';
import {
  HTTP_STATUS_SERVER_ERROR,
  HTTP_STATUS_UNAUTHORIZED,
} from '../utils/serverCodes';
import { ERoles } from '../models/role.model';

export const isAdminRole = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (!user) {
    return res.status(HTTP_STATUS_SERVER_ERROR).json({
      msg: 'validate the role without validating the token first',
    });
  }

  const { name, role } = user;

  if (role !== ERoles.ADMIN) {
    return res.status(HTTP_STATUS_UNAUTHORIZED).json({
      msg: `The user "${name}" is not an admin`,
    });
  }

  next();
};

export const hasRoles = (...roles: string[]) => {
  return (req: IRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(HTTP_STATUS_SERVER_ERROR).json({
        msg: 'validate the role without validating the token first',
      });
    }

    if (!roles.includes(user.role)) {
      return res.status(HTTP_STATUS_UNAUTHORIZED).json({
        msg: `the service requires these roles: ${roles}`,
      });
    }
    next();
  };
};
