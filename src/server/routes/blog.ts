import { FastifyInstance, FastifyRequest } from 'fastify';
import index from './pages/blog/index.js';
import read from './pages/blog/read.js';
import axios from 'axios';

export default async function indexRoutes(app: FastifyInstance, opts: any) {
    app.get('/', async (request, reply) => {
        const staticPage = await (await index).buildStaticPage()
        return reply.type('text/html').send(staticPage);
    })

    app.get('/read/:post', async (request: FastifyRequest<{ Params: { post: string } }>, reply) => {
        try {
            const { post } = request.params
            const content = await axios.get(`http://localhost:${process.env.PORT}/api/get/post/${post}`)
            const staticPage = await (await read(content.data)).buildStaticPage()
            return reply.type('text/html').send(staticPage);
        } catch (e) {
            return reply.redirect('/blog')
        }
    })
}