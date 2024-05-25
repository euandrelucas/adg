import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'

import indexRoutes from './routes/index.js'

const fastify = Fastify({
    logger: true
})

fastify.register(fastifyStatic, {
    root: process.cwd() + '/public',
    prefix: '/public/'
})

fastify.register(import('./routes/index.js'), { prefix: '/' })

fastify.listen({ port: 3000 })