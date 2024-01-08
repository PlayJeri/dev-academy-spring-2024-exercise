export type JourneyStats = {
    totalDistance: number;
    numberOfJourneys: number;
};

export type JourneyData = {
    id: number;
    departureDateTime: Date;
    returnDateTime: Date;
    departureStationName: number;
    returnStationName: number;
    distance: number;
    duration: number;
};

export type GetAllJourneysResponse = {
    nextCursor: NextCursor;
    journeys: JourneyData[];
};

export type NextCursor = {
    id: number | null;
    filter: string | number | null;
};
