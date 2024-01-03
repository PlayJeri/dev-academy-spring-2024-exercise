import React from "react";

interface Journey {
    departureStationName: string;
    returnStationName: string;
    duration: number;
    distance: number;
    departureDateTime: Date;
    returnDateTime: Date;
}

interface JourneysTableProps {
    journeys: Journey[];
}

export const JourneysTable: React.FC<JourneysTableProps> = ({ journeys }) => {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead>
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Departure station
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Return station
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Distance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Departure Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Return Time
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {journeys.map((journey, index) => (
                    <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {journey.departureStationName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {journey.returnStationName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {journey.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {journey.distance}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(
                                journey.departureDateTime
                            ).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(journey.returnDateTime).toLocaleString()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default JourneysTable;
