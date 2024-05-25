import { FastifyInstance } from 'fastify';
import index from './pages/index.js';

export default async function indexRoutes(app: FastifyInstance, opts: any) {
    app.get('/', async (request, reply) => {
        return reply.type('text/html').send(index.render());
    })
}