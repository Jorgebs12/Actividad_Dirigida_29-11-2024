export const schema = `#graphql

type Flights {
    id: ID!
    origin: String!
    destination: String!
    date: String!
}

type Query {
    getFlights(origin: String, destination: String): [Flights]
    getFlight(id: ID!): Flights
}

type Mutation {
    addFlight(origin: String!, destination: String!, date: String!): Flights!
}
`;