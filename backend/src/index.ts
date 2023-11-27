import express from "express";
import routers from "./routers";

const app = express();

app.use(express.json());

app.use("/station", routers.stationRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
