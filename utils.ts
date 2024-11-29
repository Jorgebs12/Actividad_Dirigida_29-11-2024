import { Flights, FlightsModel } from "./types.ts";

export const fromModelToFlihts = (miModeloFlights: FlightsModel): Flights => {
    return{
        id: miModeloFlights._id!.toString(),
        origin: miModeloFlights.origin,
        destination: miModeloFlights.destination,
        date: miModeloFlights.date
    }
}