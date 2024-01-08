import { Request, Response } from "express";
import pool from "../db";
import {
    GetAllJourneysResponse,
    JourneyStats,
    JourneyData,
} from "../types/Journey";

const db = pool.pool;
const queries = pool.queries;

/**
 * Get journey statistics
 *
 * @returns {JourneyStats} - total number of journeys and total distance of all journeys
 */
export const getJourneyStats = async (req: Request, res: Response) => {
    try {
        const response = await db.query(
            "SELECT COUNT(*) AS journeyCount, SUM(distance) AS totalDistance FROM journey"
        );
        const row = response.rows[0];
        const data: JourneyStats = {
            totalDistance: row.totaldistance,
            numberOfJourneys: row.journeycount,
        };
        return res.json(data);
    } catch (error) {
        console.error("Error in getJourneyStats", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * Get all journeys in the database
 *
 * @returns {GetAllJourneysResponse[]} - all journeys in the database
 */
export const getAllJourneys = async (req: Request, res: Response) => {
    try {
        const { cursor, limit = 100, order = "DESC", filter } = req.query;
        const query = queries.getAllJourneys(
            cursor as any,
            limit as number,
            order as string,
            filter as string
        );

        const response = await query;
        const data: JourneyData[] = response.rows.map((row) => ({
            id: row.id,
            departureDateTime: row.departure_date_time,
            returnDateTime: row.return_date_time,
            departureStationName: row.departure_station_name,
            returnStationName: row.return_station_name,
            distance: row.distance,
            duration: row.duration,
        }));

        const result: GetAllJourneysResponse = {
            nextCursor: {
                id: response.rows[response.rows.length - 1]["id"] || null,
                filter:
                    response.rows[response.rows.length - 1][`${filter}`] ||
                    null,
            },
            journeys: data,
        };

        return res.json(result);
    } catch (error) {
        console.error("Error in getAllJourneys", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
