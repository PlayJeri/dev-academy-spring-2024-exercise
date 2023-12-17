export type InfoBannerData = {
    numberOfStations: string;
    numberOfJourneys: string;
    totalDistance: string;
};

export type JourneyStats = {
    totalDistance: number;
    numberOfJourneys: number;
};

export type StationData = {
    id: number;
    name: string;
    address: string;
    coordinates: {
        x: number;
        y: number;
    };
};
