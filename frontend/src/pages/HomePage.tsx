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
                <div className="bg-neutral-800 text-yellow-500">
                    <StatInfoBanner stats={infoBannerData} />
                    <div className="my-4 p-8">
                        <p>
                            The data above provides some interesting insights
                            into our service. Like the total number of stations
                            across the city, total number of journeys made by
                            our users and the total distance covered by all
                            these journeys. We're proud to provide a service
                            that helps people get where they need to go.
                        </p>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
