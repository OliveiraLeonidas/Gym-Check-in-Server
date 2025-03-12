import { fastify } from 'fastify'
import { appRoutes } from './http/routes.controller'

export const app = fastify()

app.register(appRoutes)
