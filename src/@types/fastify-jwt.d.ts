import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    // payload: { id: string }
    user: {
      sub: string
    }
  }
}
