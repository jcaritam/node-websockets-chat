import { compare, genSalt, hash } from 'bcrypt';

const SALTS_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> =>
  await hash(password, await genSalt(SALTS_ROUNDS));

export const verifyPassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => await compare(password, hashPassword);
