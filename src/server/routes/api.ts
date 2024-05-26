import { FastifyInstance, FastifyRequest } from 'fastify';
import fs from 'node:fs';
import yaml from 'js-yaml';

interface FrontFormatter {
    title: string;
    date: string;
    description: string;
    tag: string;
    author: string;
    fixed: boolean;
    fileName: string;
}

interface FrontFormat {
    frontmatter: FrontFormatter;
    postContent: string;
}

function extractFrontmatter(content: string) {
    const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
    const match = content.match(frontmatterRegex);
    if (match && match[1]) {
      const frontmatter = yaml.load(match[1]);
      const postContent = content.slice(match[0].length).trim();
      return { frontmatter, postContent };
    }
    return { frontmatter: null, postContent: content };
}

export default async function indexRoutes(app: FastifyInstance, opts: any) {
    app.get('/get/posts', async (request, reply) => {
        const posts = await fs.readdirSync('posts').filter(file => file.endsWith('.mdx'))
        const JSONPosts = await posts.map((post) => {
            const content = fs.readFileSync(`posts/${post}`, 'utf8')
            const frontmatter = extractFrontmatter(content)
            return frontmatter as FrontFormat
        })
        JSONPosts.sort((a, b) => {
            if (a.frontmatter.fixed && !b.frontmatter.fixed) {
                return -1
            }
            if (!a.frontmatter.fixed && b.frontmatter.fixed) {
                return 1
            }
            const aDate = a.frontmatter.date.split('/').map((date) => parseInt(date))
            const bDate = b.frontmatter.date.split('/').map((date) => parseInt(date))
            if (aDate[0] > bDate[0]) {
                return -1
            }
            if (aDate[0] < bDate[0]) {
                return 1
            }
            if (aDate[1] > bDate[1]) {
                return -1
            }
            if (aDate[1] < bDate[1]) {
                return 1
            }
            if (aDate[2] > bDate[2]) {
                return -1
            }
            if (aDate[2] < bDate[2]) {
                return 1
            }
            return 0
        })
        JSONPosts.forEach((post, index) => {
            post.frontmatter.fileName = posts[index]
        })
        return JSONPosts
    })

    app.get('/get/post/:post', async (request: FastifyRequest<{ Params: { post: string } }>, reply) => {
        const { post } = request.params
        const content = fs.readFileSync(`posts/${post}.mdx`, 'utf8')
        if (!content) {
            return reply.status(404).send({ message: 'Post not found' })
        }
        const frontmatter = extractFrontmatter(content)
        return frontmatter
    })
}