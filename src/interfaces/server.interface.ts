import { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../models/user.model';
import { Request } from 'express';

export interface IRequest extends Request {
  uid?: string;
  user?: IUser | null;
}

export interface IJwtPayload extends JwtPayload {
  uid?: string;
}
