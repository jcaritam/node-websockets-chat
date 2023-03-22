import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserModel } from '../models/user.model';
import { HTTP_STATUS_OK, HTTP_STATUS_CREATED } from '../utils/serverCodes';
import { hashPassword } from '../helpers/bcrypt';
import { IRequest } from '../interfaces/server.interface';

export const getAllUsers: RequestHandler = async (
  req: Request<{}, {}, {}, { limit?: string; page?: string }>,
  res,
  next
) => {
  const page = +req.query.page! || 1;
  const limit = +req.query.limit! || 5;
  const skip = (page - 1) * limit;

  const query = { active: true };
  try {
    const [totalUsers, users] = await Promise.all([
      UserModel.countDocuments(query),
      UserModel.find(query).skip(skip).limit(limit),
    ]);
    res.status(HTTP_STATUS_OK).json({
      users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
  } catch (e) {
    next(e);
  }
};

export const getUserById: RequestHandler = async (
  req,
  res,
  next
): Promise<void> => {
  const { id } = req.params;
  try {
    const userId: string = id;
    const user = await UserModel.findById(userId);

    res.status(HTTP_STATUS_OK).json(user);
  } catch (e) {
    next(e);
  }
};

export const saveUser: RequestHandler = async (req, res, next) => {
  const { password } = req.body;
  try {
    const user = new UserModel(req.body);
    user.password = await hashPassword(password);
    user.save();
    res.status(HTTP_STATUS_CREATED).json(user);
  } catch (e) {
    next(e);
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { _id, password, google, email, ...userUpdate } = req.body;

  try {
    if (password) {
      userUpdate.password = hashPassword(password);
    }
    const userUpdated = await UserModel.findByIdAndUpdate(id, userUpdate);

    res.status(HTTP_STATUS_OK).json({ userUpdated });
  } catch (e) {
    next(e);
  }
};

export const deleteUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findByIdAndUpdate(id, { active: false });

    res.status(HTTP_STATUS_OK).json(user);
  } catch (e) {
    next(e);
  }
};
