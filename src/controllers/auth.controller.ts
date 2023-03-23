import { NextFunction, RequestHandler, Response } from 'express';
import {
  HTTP_STATUS_OK,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNAUTHORIZED,
} from '../utils/serverCodes';
import { UserModel } from '../models/user.model';
import { verifyPassword } from '../helpers/bcrypt';
import { generateJWT } from '../helpers/jwt';
import { IRequest } from '../interfaces/server.interface';
import { googleVerify } from '../helpers/google-verify';

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(HTTP_STATUS_BAD_REQUEST).json({
        msg: 'user / password are not correct - email',
      });
    }

    if (!user.active) {
      return res.status(HTTP_STATUS_BAD_REQUEST).json({
        msg: 'user / password are not correct - active',
      });
    }

    const validPassword = await verifyPassword(password, user.password);

    if (!validPassword) {
      return res.status(HTTP_STATUS_BAD_REQUEST).json({
        msg: 'user / password are not correct - password',
      });
    }
    const token = await generateJWT(user.id);

    res.status(HTTP_STATUS_OK).json({ user, token });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const register = async () => {
  try {
  } catch (e) {}
};

export const googleSignIn = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { id_token } = req.body as { id_token: string };
  try {
    const { email, name, picture } = await googleVerify(id_token);

    let user = await UserModel.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: '',
        img: picture,
        google: true,
      };
      user = new UserModel(data);
      await user.save();
    }

    if (!user.active) {
      return res.status(HTTP_STATUS_UNAUTHORIZED).json({
        msg: 'contact the admin, blocked account',
      });
    }

    const token = await generateJWT(user?.id);
    console.log({ token });
    res.status(HTTP_STATUS_OK).json({
      user,
      token,
    });
  } catch (e) {
    console.log(`Error: ${e}`);
    next(e);
  }
};

export const refreshToken = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;
  try {
    const token = await generateJWT(user?.uid!);
    res.status(HTTP_STATUS_OK).json({
      user,
      token,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
