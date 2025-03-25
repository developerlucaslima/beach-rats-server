import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { resolvers } from '@/graphql/resolvers'
import { typeDefs } from '@/graphql/schema'

import { env } from './config/env'

const server = new ApolloServer({ resolvers, typeDefs })
const { url } = await startStandaloneServer(server, {
  listen: { port: env.PORT },
})

console.log(`🚀  Server ready at: ${url}`)
