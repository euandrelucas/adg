import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'

const fastify = Fastify()

fastify.register(import('@fastify/compress'))

fastify.register(fastifyStatic, {
    root: process.cwd() + '/public',
    prefix: '/'
})

fastify.register(import('./routes/index.js'), { prefix: '/' })

fastify.listen({ port: 3000 })