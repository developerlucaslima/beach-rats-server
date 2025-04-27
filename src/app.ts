import { registerPlugins } from '@http/plugins'
import Fastify from 'fastify'

import { env } from './env'

export function buildApp() {
  const app = Fastify({ logger: true })
  registerPlugins(app)
  return app
}

const startApp = async () => {
  const app = buildApp()
  try {
    await app.listen({ host: '0.0.0.0', port: env.PORT })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

startApp()
