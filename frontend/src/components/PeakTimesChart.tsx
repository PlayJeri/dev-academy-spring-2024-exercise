import React from "react";
import { peakTimes } from "../types/index";
import { LineChart } from "@mui/x-charts";

type PeakTimesChartProps = {
    peakTimes: peakTimes[];
};

export const PeakTimesChart: React.FC<PeakTimesChartProps> = ({
    peakTimes,
}) => {
    return (
        <div className="flex flex-col h-96 border shadow mx-auto text-white items-center text-center bg-slate-50 rounded-3xl p-4">
            <h1 className="text-slate-800 text-5xl font-semibold">
                Peak times
            </h1>
            <LineChart
                xAxis={[
                    {
                        data: peakTimes.map((peakTime) => peakTime.hour),
                        label: "Time",
                    },
                ]}
                series={[
                    {
                        data: peakTimes.map(
                            (peakTime) => peakTime.journeysStarted
                        ),
                        label: "Number or journeys",
                    },
                ]}
            />
        </div>
    );
};
