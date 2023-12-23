export type JourneyStats = {
    totalDistance: number;
    numberOfJourneys: number;
};

type JourneyData = {
    id: number;
    departureDateTime: Date;
    returnDateTime: Date;
    departureStationId: number;
    returnStationId: number;
    distance: number;
    duration: number;
};

export type GetAllJourneysResponse = {
    nextCursor: number | null;
    journeys: JourneyData[];
};
