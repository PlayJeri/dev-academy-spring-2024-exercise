import { HomePageInfoCard } from "../components/HomePageInfoCard";
import { StatInfoBanner } from "../components/StatInfoBanner";
import { useState, useEffect } from "react";
import { InfoBannerData, JourneyStats, StationData } from "../types";
import { useFetch } from "../hooks/useFetch";

export const HomePage = () => {
    const { data: stationsData } = useFetch<StationData[] | null>("/station");
    const { data: journeyData } = useFetch<JourneyStats | null>(
        "/journey/stats"
    );

    const [infoBannerData, setInfoBannerData] = useState<InfoBannerData>();

    useEffect(() => {
        if (stationsData && journeyData) {
            const infoBannerData: InfoBannerData = {
                numberOfStations: stationsData.length,
                numberOfJourneys: journeyData.numberOfJourneys,
                totalDistance: journeyData.totalDistance,
            };
            setInfoBannerData(infoBannerData);
        }
    }, [stationsData, journeyData]);

    return (
        <div className="flex flex-col items-center h-screen">
            <HomePageInfoCard />
            {infoBannerData ? (
                <StatInfoBanner stats={infoBannerData} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
