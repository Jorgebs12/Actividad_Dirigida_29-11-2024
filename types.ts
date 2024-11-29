import { OptionalId } from "mongodb";

export type Flights = {
    id: string;
    origin: string;
    destination: string;
    date: string;
};

export type FlightsModel = OptionalId<{
    origin: string;
    destination: string;
    date: string;
}>;
