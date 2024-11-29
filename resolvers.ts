import { Collection, ObjectId } from "mongodb";
import { Flights, FlightsModel } from "./types.ts";
import { fromModelToFlihts } from "./utils.ts";

export const resolvers = {
    Query: {

        //tiene los argumentos opcionales origen y destino. Si ambos argumentos están presentes devuelve todos los vuelos con dicho origen y destino, si solo un argumento está presente, por ejemplo el origen, devuelve todos los vuelos con ese origen, si ningún argumento está presente devuelve todos los vuelos (incluyendo sus ids).
        getFlights: async(_:unknown, {origin, destination}: { origin?: string, destination?: string }, context : { FlightsModel: Collection<FlightsModel> }): Promise<Flights[]> => {
            const miFlightModel = await context.FlightsModel.find().toArray();
            return miFlightModel.map((elem) => fromModelToFlihts(elem));
              
        
        },

        getFlight: async(_:unknown, {id}: { id: string }, context : { FlightsModel: Collection<FlightsModel> }): Promise<Flights | null> => {

            const flight = await context.FlightsModel.findOne({ _id: new ObjectId(id) });
            if (!flight) return null;

            return fromModelToFlihts(flight);
        },
    },

    Mutation: {

        addFlight: async(_:unknown, args: { origin: string, destination: string, date: string }, context : { FlightsModel: Collection<FlightsModel> }): Promise<Flights> => {

            const {origin, destination, date} = args;
            const {insertedId} = await context.FlightsModel.insertOne({origin, destination, date});

            return {
                id: insertedId.toString(),
                origin,
                destination,
                date
            };
        }
    }
};