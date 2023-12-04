import { Router } from "express";
import controllers from "../controllers";

const router = Router();
const controller = controllers.station;

router.get("/", controller.getAllStations);
router.get("/:id", controller.getStationById);

export { router as stationRouter };
