import express from "express";
import routers from "./routers";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use(express.json());

app.use("/station", routers.stationRouter);
app.use("/journey", routers.journeyRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
