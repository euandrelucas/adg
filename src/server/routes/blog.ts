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
            const content = await axios.get(`http://127.0.0.1:${process.env.PORT}/api/get/post/${post}`)
            const staticPage = await (await read(content.data)).buildStaticPage()
            return reply.type('text/html').send(staticPage);
        } catch (e) {
            return reply.redirect('/blog')
        }
    })

    app.get('/rss', async (request, reply) => {
        const response = await axios.get(`http://127.0.0.1:${process.env.PORT}/api/get/posts`)
        const posts = response.data;
        const rss = `<?xml version="1.0" encoding="UTF-8" ?>
        <rss version="2.0">
        <channel>
        <title>Blog</title>
        <link>${process.env.FQDN}/blog</link>
        <description>Feed RSS do blog</description>
        ${posts.map((post: any) => {
            return `
            <item>
            <title>${post.frontmatter.title}</title>
            <link>${process.env.FQDN}/blog/read/${post.frontmatter.fileName.replace('.mdx', '')}</link>
            <description>${post.frontmatter.description}</description>
            </item>
            `
        }).join('')}
        </channel>
        </rss>`
        const formatedRss = rss.replace(/\s{2,}/g, ' ').replace(/>\s+</g, '><');
        return reply.type('text/xml').send(formatedRss);
    })
}