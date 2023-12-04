import { Router } from "express";
import controllers from "../controllers";

const router = Router();
const controller = controllers.journey;

router.get("/stats", controller.getJourneyStats);

export { router as journeyRouter };
