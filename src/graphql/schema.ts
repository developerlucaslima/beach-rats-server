export const typeDefs = `#graphql
  scalar DateTime

  enum Role {
    professor
    aluno
    atleta
    administrador
  }

  enum Modality {
    futevolei
    altinha
  }

  enum PreferredSide {
    left
    right
  }

  enum DominantFoot {
    left
    right
    ambidextrous
  }

  enum PhysicalLabel {
    forte
    agil
    resistente
    explosivo
    potente
    fraco
    lento
    cansado
    lesionado
  }

  enum MentalLabel {
    frio
    concentrado
    confiante
    estressado
    provocador
    resiliente
    distraido
    inseguro
    ansioso
    timido
  }

  enum SkillType {
    attack
    defense
  }

  # This "Player" type defines the queryable fields for every player in our data source.
  type Player {
    id: ID!
    name: String!
    email: String!
    passwordHash: String!
    photo: String
    age: Int
    role: Role
    modality: Modality
    country: String
    address: String
    preferredSide: PreferredSide
    dominantFoot: DominantFoot
    physical: PhysicalLabel
    mental: MentalLabel
    playerFundamentals: [PlayerFundamental]
    playerResources: [PlayerResource]
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Fundamental {
    name: String!
    emoji: String!
    rating: Int!
    modality: Modality!
    type: SkillType!
    playerFundamentals: [PlayerFundamental!]!
    createdAt: DateTime
    updatedAt: DateTime
  }

  type PlayerFundamental {
    id: ID!
    rating: Int!
    player: Player!
    fundamental: Fundamental!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Resource {
    name: String!
    emoji: String!
    rating: Int!
    modality: Modality!
    type: SkillType!
    playerResources: [PlayerResource!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type PlayerResource {
    id: ID!
    hasResource: Boolean!
    player: Player!
    resource: Resource!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    findAllPlayers: [Player!]!
    # findOnePlayerById(id: ID!): Player
  }

  type Mutation {
    createOnePlayer(
      name: String!, 
      email: String!, 
      password: String!
    ): Player!
  }
`
