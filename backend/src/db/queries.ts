import { pool } from "./connection";

const db = pool;

export const getStationData = (stationId: string) => {
    const stationData = db.query("SELECT * FROM station WHERE id = $1", [
        stationId,
    ]);
    return stationData;
};

export const getNumberOfStartedJourneys = (stationId: string) => {
    const numberOfStartedJourneys = db.query(
        "SELECT COUNT(*) FROM journey WHERE departure_station_id = $1",
        [stationId]
    );
    return numberOfStartedJourneys;
};

export const getNumberOfEndedJourneys = (stationId: string) => {
    const numberOfEndedJourneys = db.query(
        "SELECT COUNT(*) FROM journey WHERE return_station_id = $1",
        [stationId]
    );
    return numberOfEndedJourneys;
};

export const getAvgStartedJourneyDistance = (stationId: string) => {
    const avgStartedJourneyDistance = db.query(
        "SELECT AVG(distance) FROM journey WHERE departure_station_id = $1",
        [stationId]
    );
    return avgStartedJourneyDistance;
};

export const getAvgStartedJourneyDuration = (stationId: string) => {
    const avgStartedJourneyDuration = db.query(
        "SELECT AVG(duration) FROM journey WHERE departure_station_id = $1",
        [stationId]
    );
    return avgStartedJourneyDuration;
};

export const getTopThreeDestinations = (stationId: string) => {
    const topThreeDestinations = db.query(
        `
        SELECT station.station_name, journey.return_station_id, COUNT(*)
        FROM journey
        INNER JOIN station ON station.id = journey.return_station_id
        WHERE departure_station_id = $1
        GROUP BY return_station_id, station.station_name
        ORDER BY COUNT(*)
        DESC LIMIT 3
    `,
        [stationId]
    );
    return topThreeDestinations;
};

export const getPeakTimes = (stationId: string) => {
    const peakTimes = db.query(
        `
        SELECT EXTRACT(HOUR FROM departure_date_time) AS hour, COUNT(*)
        FROM journey
        WHERE departure_station_id = $1
        GROUP BY hour
        ORDER BY hour
        `,
        [stationId]
    );
    return peakTimes;
};