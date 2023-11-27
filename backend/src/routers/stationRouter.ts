import { Router } from "express";
import controllers from "../controllers";

const router = Router();

router.get("/", controllers.station.getAllStations);
router.get("/:id", controllers.station.getStationById);

export { router as stationRouter };
