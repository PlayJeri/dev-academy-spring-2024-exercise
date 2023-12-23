import { getAllStations, getStationById } from "./stationController";
import { getJourneyStats, getAllJourneys } from "./journeyControllers";

export default {
    station: {
        getAllStations,
        getStationById,
    },
    journey: {
        getJourneyStats,
        getAllJourneys,
    },
};
