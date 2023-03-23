import { Socket } from 'socket.io';
import { verifyJwt } from '../helpers/jwt';

export const socketController = async (socket: Socket) => {
  console.log(`Client connected ${socket.id}`);
  const token = socket.handshake.headers['x-token'];
  const user = await verifyJwt(token as string, process.env.SECRET_KEY as string);

  if (!user) {
    return socket.disconnect();
  }
  console.log(`user connected: ${user.name}`);
};
