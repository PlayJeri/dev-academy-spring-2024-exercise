export type InfoBannerData = {
    numberOfStations: number;
    numberOfJourneys: number;
    totalDistance: number;
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

export type StationDetails = {
    stationData: StationData;
    journeysStarted: number;
    journeysEnded: number;
    avgJourneyDistance: number;
    avgJourneyDuration: number;
    topThreeDestinations: topThreeDestination[];
    peakTimes: peakTimes[];
};

export type peakTimes = {
    hour: number;
    journeysStarted: number;
};

type topThreeDestination = {
    stationId: number;
    stationName: string;
    numberOfJourneys: number;
};
