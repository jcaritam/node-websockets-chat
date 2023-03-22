import { UserModel, RoleModel } from '../models';

export const isRoleValid = async (role: string) => {
  const roleExist = await RoleModel.findOne({ role });
  if (!roleExist) {
    throw new Error(`the role: ${role} is not registered`);
  }
};

export const isEmailExist = async (email: string) => {
  const emailExist = await UserModel.findOne({ email });
  if (emailExist) {
    throw new Error(`the email "${email}" already registered`);
  }
};

export const userByIdExist = async (id: string) => {
  const userExist = await UserModel.findById(id);
  if (!userExist) {
    throw new Error(`the user with id: ${id}, not exist`);
  }
};

export const collectionsAllowed = (
  collection: string,
  collections: string[]
) => {
  if (!collections.includes(collection)) {
    throw new Error(`the collection ${collection} not allowed`);
  }
  return true;
};
