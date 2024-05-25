import 'dotenv/config'
import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'

const fastify = Fastify({
    logger: true
})

fastify.register(import('@fastify/compress'))

fastify.register(fastifyStatic, {
    root: process.cwd() + '/public',
    prefix: '/'
})

fastify.register(import('./routes/index.js'), { prefix: '/' })

fastify.listen({ port: parseInt(process.env.PORT as string), host: '0.0.0.0' })