import { useEffect, useState } from "react";
import { StationDetails } from "../types";
import { StationDetailCard } from "../components/StationDetailCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PeakTimesChart } from "../components/PeakTimesChart";
import { StationLocationMap } from "../components/StationLocationMap";

export const StationPage = () => {
    const [stationDetails, setStationDetails] = useState<StationDetails>();
    const { stationId } = useParams<{ stationId: string }>();

    useEffect(() => {
        const fetchStationDetails = async () => {
            const stationDetails = await axios.get(`/station/${stationId}`);
            setStationDetails(stationDetails.data);
        };

        fetchStationDetails();
    }, [stationId]);

    const convertToMinutes = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = seconds % 60;
        return `${minutes}m ${secondsLeft}s`;
    };

    const convertToKm = (meters: number): string => {
        const km = meters / 1000;
        return `${km.toFixed(2)}km`;
    };

    return (
        <>
            <div className="text-center my-12">
                <h1 className="text-slate-800 text-5xl font-bold">
                    {stationDetails
                        ? stationDetails.stationData.name
                        : "Loading..."}
                </h1>
                <h2 className="text-slate-600 text-3xl pt-2">
                    {stationDetails
                        ? stationDetails.stationData.address
                        : "Loading..."}
                </h2>
            </div>
            {stationDetails && (
                <>
                    <div className="grid justify-center sm:grid-cols-2 lg:grid-cols-3 max-w-[1200px] gap-4 p-8 mx-auto">
                        <div className="col-span-2 row-span-2">
                            <PeakTimesChart
                                peakTimes={stationDetails.peakTimes}
                            />
                        </div>
                        <StationDetailCard
                            title="Average Duration"
                            values={[
                                convertToMinutes(
                                    stationDetails.avgJourneyDuration
                                ),
                            ]}
                        />
                        <StationDetailCard
                            title="Average Distance"
                            values={[
                                convertToKm(stationDetails.avgJourneyDistance),
                            ]}
                        />
                        <div className="col-span-2 row-span-3">
                            <StationLocationMap
                                x={stationDetails.stationData.coordinates.x}
                                y={stationDetails.stationData.coordinates.y}
                            />
                        </div>
                        <StationDetailCard
                            title="Top 3 destinations"
                            values={[
                                ...stationDetails.topThreeDestinations.map(
                                    (destination) => destination.stationName
                                ),
                            ]}
                        />
                        <StationDetailCard
                            title="Started journeys"
                            values={[
                                stationDetails.journeysStarted.toLocaleString(),
                            ]}
                        />
                        <StationDetailCard
                            title="Ended journeys"
                            values={[
                                stationDetails.journeysEnded.toLocaleString(),
                            ]}
                        />
                    </div>
                </>
            )}
        </>
    );
};
