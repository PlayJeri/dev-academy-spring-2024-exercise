import { Request, Response } from "express";
import pool from "../db";

const db = pool.pool;

export const getAllStations = async (req: Request, res: Response) => {
    try {
        const result = await db.query("SELECT * FROM station");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error getting all stations", error);
        res.status(500).send("Internal server error");
    }
};
