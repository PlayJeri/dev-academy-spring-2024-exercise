import { HomePageInfoCard } from "../components/HomePageInfoCard";
import { StatInfoBanner } from "../components/StatInfoBanner";
import { useState, useEffect } from "react";
import { InfoBannerData, JourneyStats } from "../types";
import axios from "axios";

export const HomePage = () => {
    const [infoBannerData, setInfoBannerData] = useState<InfoBannerData>();

    useEffect(() => {
        const fetchInfoBannerData = async () => {
            const numberOfStations = await axios.get("/station");
            const journeyData: JourneyStats = (
                await axios.get("/journey/stats")
            ).data;

            setInfoBannerData({
                numberOfStations: numberOfStations.data.length,
                numberOfJourneys: Number(
                    journeyData.numberOfJourneys
                ).toLocaleString(),
                totalDistance: Math.round(
                    journeyData.totalDistance / 1000
                ).toLocaleString(),
            });
        };

        fetchInfoBannerData();
    }, []);

    return (
        <div className="flex flex-col items-center h-screen">
            <HomePageInfoCard />
            {infoBannerData && <StatInfoBanner stats={infoBannerData} />}
        </div>
    );
};
