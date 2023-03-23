import jwt from 'jsonwebtoken';
import { UserModel, IUser } from '../models/user.model';
import { IJwtPayload } from '../interfaces/server.interface';

export const generateJWT = (uid: string) => {
  return new Promise((resolve, rejected) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRET_KEY as string,
      {
        expiresIn: '5h',
      },
      (err, token) => {
        if (err) {
          console.error(err);
          rejected('Could not generate the JWT');
        } else {
          resolve(token);
        }
      }
    );
  });
};

export const verifyJwt = async (
  token: string,
  secretKey: string
): Promise<IUser | null> => {
  try {
    if (typeof token !== 'string' || token.length < 10) {
      throw new Error('invalid token');
    }

    const { uid } = jwt.verify(token, secretKey) as IJwtPayload;

    const user = await UserModel.findById(uid);

    if (!user) {
      throw new Error('user not found');
    }

    return user;
  } catch (e) {
    console.error(e);
    throw new Error('failed to verify token');
  }
};
