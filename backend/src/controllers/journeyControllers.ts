import { Request, Response } from "express";
import pool from "../db";
import { GetAllJourneysResponse, JourneyStats } from "../types/Journey";

const db = pool.pool;

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
        console.log("getAllJourneys");
        const { cursor, limit = 50, order = "DESC", filter } = req.query;
        let query = "SELECT * FROM journey";

        if (cursor) {
            query += ` WHERE id > ${cursor}`;
        }
        if (filter) {
            query += ` ORDER by ${filter} ${order}`;
        }
        query += ` LIMIT ${limit}`;
        console.log(query);

        const response = await db.query(query);
        const data = response.rows;
        const newCursor = data.length > 0 ? data[data.length - 1].id : null;

        const result: GetAllJourneysResponse = {
            nextCursor: newCursor,
            journeys: data,
        };

        return res.json(result);
    } catch (error) {
        console.error("Error in getAllJourneys", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
