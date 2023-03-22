import swaggerJsDoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Rest Server Demo', version: '1.0.0' },
  },
  apis: ['./user.routes.ts'],
};

const swaggerSpec = swaggerJsDoc(options);

export const swaggerDocs = (app: Express, port: number | string) => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log(
    `📖 Version 1 docs are available at http://localhost:${port}/api/v1/docs`
  );
};
