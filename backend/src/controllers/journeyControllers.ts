import { Request, Response } from "express";
import pool from "../db";
import { JourneyStats } from "../types/Journey";

const db = pool.pool;

export const getJourneyStats = async (req: Request, res: Response) => {
    try {
        const response = await db.query(
            "SELECT COUNT(*) AS journeyCount, SUM(distance) AS totalDistance FROM journey"
        );
        const data: JourneyStats = response.rows[0];
        res.json(data);
    } catch (error) {
        console.error("Error in getJourneyStats", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
