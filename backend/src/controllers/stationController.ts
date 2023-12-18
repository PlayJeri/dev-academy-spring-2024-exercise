import { Request, Response } from "express";
import { StationData, StationDetails } from "../types/Station";
import pool from "../db";

const db = pool.pool;

/**
 * Get all stations in the database
 *
 * @returns {StationData[]} - all stations in the database
 */
export const getAllStations = async (req: Request, res: Response) => {
    try {
        const result = await db.query(
            `SELECT * FROM station ORDER BY station_name DESC`
        );

        const data: StationData[] = result.rows.map((row) => ({
            id: row.id,
            name: row.station_name,
            address: row.station_address,
            coordinates: {
                x: parseFloat(row.coordinate_x),
                y: parseFloat(row.coordinate_y),
            },
        }));

        res.status(200).json(data);
    } catch (error) {
        console.error("Error getting all stations", error);
        res.status(500).send("Internal server error");
    }
};

/**
 * Get detailed information about a single station with station id
 *
 * @param {number} req.params.id - station id
 * @returns {StationDetails} - detailed information about a single station
 * Distance and duration are rounded to the nearest integer and returned in minutes and meters
 */
export const getStationById = async (req: Request, res: Response) => {
    try {
        const stationId = req.params.id;

        const stationData = db.query("SELECT * FROM station WHERE id = $1", [
            stationId,
        ]);

        const numberOfStartedJourneys = db.query(
            "SELECT COUNT(*) FROM journey WHERE departure_station_id = $1",
            [stationId]
        );

        const numberOfEndedJourneys = db.query(
            "SELECT COUNT(*) FROM journey WHERE return_station_id = $1",
            [stationId]
        );

        const avgStartedJourneyDistance = db.query(
            "SELECT AVG(distance) FROM journey WHERE departure_station_id = $1",
            [stationId]
        );

        const avgStartedJourneyDuration = db.query(
            "SELECT AVG(duration) FROM journey WHERE departure_station_id = $1",
            [stationId]
        );

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

        const [
            stationDataResult,
            numberOfStartedJourneysResult,
            numberOfEndedJourneysResult,
            avgStartedJourneyDistanceResult,
            avgStartedJourneyDurationResult,
            topThreeDestinationsResult,
            peakTimesResult,
        ] = await Promise.all([
            stationData,
            numberOfStartedJourneys,
            numberOfEndedJourneys,
            avgStartedJourneyDistance,
            avgStartedJourneyDuration,
            topThreeDestinations,
            peakTimes,
        ]);

        const data: StationDetails = {
            stationData: {
                id: stationDataResult.rows[0].id,
                name: stationDataResult.rows[0].station_name,
                address: stationDataResult.rows[0].station_address,
                coordinates: {
                    x: parseFloat(stationDataResult.rows[0].coordinate_x),
                    y: parseFloat(stationDataResult.rows[0].coordinate_y),
                },
            },
            journeysStarted: parseInt(
                numberOfStartedJourneysResult.rows[0].count
            ),
            journeysEnded: parseInt(numberOfEndedJourneysResult.rows[0].count),
            avgJourneyDistance: Math.round(
                avgStartedJourneyDistanceResult.rows[0].avg
            ),
            avgJourneyDuration: Math.round(
                avgStartedJourneyDurationResult.rows[0].avg
            ),
            topThreeDestinations: topThreeDestinationsResult.rows.map(
                (row) => ({
                    stationId: row.return_station_id,
                    stationName: row.station_name,
                    numberOfJourneys: parseInt(row.count),
                })
            ),
            peakTimes: peakTimesResult.rows.map((row) => ({
                hour: parseInt(row.hour),
                journeysStarted: parseInt(row.count),
            })),
        };

        res.status(200).json(data);
    } catch (error) {
        console.error("Error getting station by id", error);
        res.status(500).send("Internal server error");
    }
};
