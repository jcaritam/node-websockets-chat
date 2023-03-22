import { ObjectId, Schema, model } from 'mongoose';
import { ERoles } from './role.model';

export interface IUser extends Document {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  img?: string;
  role: ERoles;
  active: boolean;
  google: boolean;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: [true, 'El nombre es obligatorio'] },
  email: {
    type: String,
    require: [true, 'El email es obligatorio'],
    unique: true,
  },
  password: { type: String, require: [true] },
  img: String,
  role: { type: String, enum: Object.values(ERoles), default: ERoles.USER },
  active: { type: Boolean, default: true },
  google: { type: Boolean, default: false },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  return { uid: _id, ...user };
};

export const UserModel = model<IUser>('User', UserSchema);
