import { JourneyData, NextCursor } from "../types/Journey";
import { pool } from "./connection";

const db = pool;

export const getAllStations = () => {
    const allStations = db.query(
        `SELECT * FROM station ORDER BY station_name ASC`
    );
    return allStations;
};

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

export const getAllJourneys = (
    cursor: NextCursor | null,
    limit: number,
    order: string,
    filter: string
) => {
    console.log(cursor);
    console.log(filter);
    let query = `
        SELECT
        journey.*,
        departure_station.station_name as departure_station_name, 
        return_station.station_name as return_station_name 
        FROM journey
        INNER JOIN station as departure_station ON journey.departure_station_id = departure_station.id
        INNER JOIN station as return_station ON journey.return_station_id = return_station.id
    `;

    if (cursor) {
        switch (filter) {
            case "departure_date_time":
                query += ` WHERE (departure_date_time, journey.id) > ('${cursor.filter}', ${cursor.id})`;
                break;
            case "return_date_time":
                query += ` WHERE (return_date_time, journey.id) > ('${cursor.filter}', ${cursor.id})`;
                break;
            case "departure_station_name":
                query += ` WHERE (departure_station_name, journey.id) > ('${cursor.filter}', ${cursor.id})`;
                break;
            case "return_station_name":
                query += ` WHERE (return_station_name, journey.id) > ('${cursor.filter}', ${cursor.id})`;
                break;
            case "distance":
                query += ` WHERE (distance, journey.id) > (${cursor.filter}, ${cursor.id})`;
                break;
            case "duration":
                console.log("JEEJOO");
                // query += ` WHERE (journey.duration, journey.id) > (${cursor.filter}, ${cursor.id})`;
                query += ` WHERE journey.id > ${cursor.id}`;
                break;
        }
    }
    if (filter) {
        if (filter === "distance" || filter === "duration") {
            query += ` ORDER BY COALESCE(${filter}, 0), id ${order}`;
        } else {
            query += ` ORDER BY ${filter}, id ${order}`;
        }
    }
    query += ` LIMIT ${limit}`;

    const response = db.query(query);
    return response;
};
