import { FastifyInstance } from 'fastify';
import index from './pages/index.js';
import mod from './pages/mod.js';
import dev from './pages/dev.js';
import contact from './pages/contact.js';

export default async function indexRoutes(app: FastifyInstance, opts: any) {
    app.get('/', async (request, reply) => {
        return reply.type('text/html').send(index.buildStaticPage());
    })

    app.get('/mod', async (request, reply) => {
        const staticPage = await (await mod).buildStaticPage()
        return reply.type('text/html').send(staticPage);
    })

    app.get('/dev', async (request, reply) => {
        const staticPage = await (await dev).buildStaticPage()
        return reply.type('text/html').send(staticPage);
    })

    app.get('/contact', async (request, reply) => {
        return reply.type('text/html').send(contact.buildStaticPage());
    })
}