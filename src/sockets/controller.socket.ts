import { Socket, Server } from 'socket.io';
import { verifyJwt } from '../helpers/jwt';
import { ChatMessages } from '../models/chat-messages.model';
import { IPayloadSendMessage } from '../interfaces/sockets.interface';

const chatMessage = new ChatMessages();

export const socketController = async (socket: Socket, io: Server) => {
  const token = socket.handshake.headers['x-token'];
  const user = await verifyJwt(
    token as string,
    process.env.SECRET_KEY as string
  );

  if (!user) {
    return socket.disconnect();
  }
  chatMessage.connectUser(user);

  io.emit('active-users', chatMessage.userArr);
  socket.emit('receive-messages', chatMessage.last10);

  socket.join(user.id!);

  socket.on('disconnect', () => {
    chatMessage.disconnectUser(user.id!);
    io.emit('active-users', chatMessage.userArr);
  });

  socket.on('send-message', ({ message, uid }: IPayloadSendMessage) => {
    if (uid) {
      socket.to(uid).emit('private-message', { de: user.name, message });
    } else {
      chatMessage.sendMessage(user.id!, user.name, message);
      io.emit('receive-messages', chatMessage.last10);
    }
  });
};
