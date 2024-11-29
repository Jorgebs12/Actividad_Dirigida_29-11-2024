import { ApolloServer } from "@apollo/server";
import { schema } from "./schema.ts";
import { MongoClient } from "mongodb";
import { FlightsModel } from "./types.ts";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.ts";

const MONGO_URL = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  throw new Error("Please provide a MONGO_URL");
}

const mongoClient = new MongoClient(MONGO_URL);
await mongoClient.connect();

console.info("Connected to MongoDB");

const mongoDB = mongoClient.db("Flights-JB");
const FlightsModel = mongoDB.collection<FlightsModel>("Flights-JB");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

//lo que duevuelve esta funcion es el contexto 
//en esta caso no es async, pero la definicion es async, no tiene porque ser async
const { url } = await startStandaloneServer(server, {
  context: async () => ({ FlightsModel }),
  listen: {port: 8000}
});

console.info(`Server ready at ${url}`);