
import { IUser } from "./user.model";


class Message {
  uid: string;
  name: string;
  message: string;
  constructor(uid: string, name: string, message: string) {
    this.uid = uid;
    this.name = name;
    this.message = message;
  }
}

export class ChatMessages {
  messages: Message[];
  users: { [key: string]: IUser };

  constructor() {
    this.messages = [];
    this.users = {};
  }

  get last10(): Message[] {
    // return this.messages.splice(0, 10);
    const start = Math.max(this.messages.length - 10, 0);
    return this.messages.slice(start);
  }

  get userArr(): IUser[] {
    return Object.values(this.users);
  }

  sendMessage(uid: string, name: string, message: string): void {
    const newMessage = new Message(uid, name, message);
    this.messages.unshift(newMessage);
  }

  connectUser(user: IUser): void {
    this.users[user.id!] = user;
  }

  disconnectUser(id: string): void {
    delete this.users[id];
  }
}
