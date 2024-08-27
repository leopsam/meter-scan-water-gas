import 'dotenv/config';
import fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

const app = fastify();

app.register(cors, {
  origin: true,
});

app.register(jwt, {
  secret: 'meterscanwatergas',
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333');
  });
