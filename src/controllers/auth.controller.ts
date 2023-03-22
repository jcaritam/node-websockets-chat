import { RequestHandler } from 'express';
import { HTTP_STATUS_OK, HTTP_STATUS_BAD_REQUEST } from '../utils/serverCodes';
import { UserModel } from '../models/user.model';
import { verifyPassword } from '../helpers/bcrypt';
import { generateJWT } from '../helpers/jwt';

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
