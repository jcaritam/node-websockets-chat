import jwt from 'jsonwebtoken';

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
