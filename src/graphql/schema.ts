export const typeDefs = `#graphql
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
    photo: String
    age: Int
    role: Role!
    modality: Modality!
    country: String
    address: String
    preferredSide: PreferredSide!
    dominantFoot: DominantFoot!
    physical: PhysicalLabel!
    mental: MentalLabel!
  }

  type Query {
    allPlayers: [Player!]!
    getPlayer(id: ID!): Player
  }

  type Mutation {
    registerPlayer(name: String!, email: String!, password: String!): Player!
  }
`
