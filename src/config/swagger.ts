import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio API',
      version: '1.0.0',
      description: 'API documentation for the Portfolio application',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;