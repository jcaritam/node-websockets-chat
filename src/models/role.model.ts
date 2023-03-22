import { Schema, model } from 'mongoose';

export enum ERoles {
  ADMIN = 'ADMIN_ROLE',
  USER = 'USER_ROLE',
  SALES = 'SALES_ROLE',
}

export interface IRole {
  role: string;
}

const RoleSchema = new Schema<IRole>({
  role: {
    type: String,
    required: [true, 'El role es obligatorio'],
    enum: Object.values(ERoles),
    default: ERoles.USER,
  },
});

export const RoleModel = model<IRole>('Role', RoleSchema);
