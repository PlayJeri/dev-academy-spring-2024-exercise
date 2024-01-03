import { pool } from "./connection";
import {
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
