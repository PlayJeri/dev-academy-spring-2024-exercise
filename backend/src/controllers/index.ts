import { getAllStations, getStationById } from "./stationController";
import { getJourneyStats } from "./journeyControllers";

export default {
    station: {
        getAllStations,
        getStationById,
    },
    journey: {
        getJourneyStats,
    },
};
