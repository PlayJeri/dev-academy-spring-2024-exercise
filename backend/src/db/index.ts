import { pool } from "./connection";
import {
    getAllStations,
    getStationData,
    getNumberOfStartedJourneys,
    getNumberOfEndedJourneys,
    getAvgStartedJourneyDistance,
    getAvgStartedJourneyDuration,
    getTopThreeDestinations,
    getPeakTimes,
    getAllJourneys,
} from "./queries";

export default {
    pool,
    queries: {
        getAllStations,
        getStationData,
        getNumberOfStartedJourneys,
        getNumberOfEndedJourneys,
        getAvgStartedJourneyDistance,
        getAvgStartedJourneyDuration,
        getTopThreeDestinations,
        getPeakTimes,
        getAllJourneys,
    },
};
