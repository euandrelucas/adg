import 'dotenv/config'
import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'

const fastify = Fastify({
    logger: true
})

fastify.register(fastifyStatic, {
    root: process.cwd() + '/public',
    prefix: '/'
})

fastify.register(import('./routes/index.js'), { prefix: '/' })
fastify.register(import('./routes/api.js'), { prefix: '/api' })
fastify.register(import('./routes/blog.js'), { prefix: '/blog' })

fastify.listen({ port: parseInt(process.env.PORT as string), host: '0.0.0.0' })