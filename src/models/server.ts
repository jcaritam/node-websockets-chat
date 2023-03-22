import http from 'http'
import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import cors from 'cors';
import { router } from '../router';
import { connectionDB } from '../database/config';
import { swaggerDocs } from '../router/swagger';
import { Server as SocketServer } from 'socket.io';
import { socketController } from '../sockets/controller.socket';
config();

export class Server {
  port;
  app;
  server
  io
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.server = http.createServer(this.app)
    this.io = new SocketServer(this.server)
    this.init();
  }

  init() {

    this.app.use(morgan('dev'));
    this.app.use(cors());

    this.database();

    this.middlewares();

    this.routes();

    this.sockets()
  }

  middlewares() {
    this.app.use(express.static('public'));
    this.app.use(express.json());
    swaggerDocs(this.app, this.port);
  }

  async database() {
    await connectionDB();
  }

  routes() {
    router(this.app);
  }

  sockets() {
    this.io.on('connection', socketController)
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server listen on http:localhost:${this.port}`);
    });
  }
}
