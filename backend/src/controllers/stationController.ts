import { Request, Response } from "express";
import { StationData, StationDetails } from "../types/Station";
import redisClient from "../redis";
import pool from "../db";

const db = pool.pool;
const queries = pool.queries;

/**
 * Get all stations in the database
 *
 * @returns {StationData[]} - all stations in the database
 */
export const getAllStations = async (req: Request, res: Response) => {
    try {
        const cacheKey = "stations";
        const cachedStations = await redisClient.get(cacheKey);

        if (cachedStations) {
            console.log("using cached stations");
            return res.status(200).json(JSON.parse(cachedStations));
        }
        console.log("using db");

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

        await redisClient.set(
            cacheKey,
            JSON.stringify(data),
            "EX",
            60 * 60 * 24
        ); // 24 hours
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
        const cacheKey = `station:${req.params.id}`;
        const cachedStation = await redisClient.get(cacheKey);

        if (cachedStation) {
            console.log("using cached station");
            return res.status(200).json(JSON.parse(cachedStation));
        }

        const stationId = req.params.id;

        const stationData = queries.getStationData(stationId);

        const numberOfStartedJourneys =
            queries.getNumberOfStartedJourneys(stationId);

        const numberOfEndedJourneys =
            queries.getNumberOfEndedJourneys(stationId);

        const avgStartedJourneyDistance =
            queries.getAvgStartedJourneyDistance(stationId);

        const avgStartedJourneyDuration =
            queries.getAvgStartedJourneyDuration(stationId);

        const topThreeDestinations = queries.getTopThreeDestinations(stationId);
        const peakTimes = queries.getPeakTimes(stationId);

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

        await redisClient.set(cacheKey, JSON.stringify(data), "EX", 60 * 60); // 1 hour
    } catch (error) {
        console.error("Error getting station by id", error);
        res.status(500).send("Internal server error");
    }
};
