import { useEffect, useMemo, useState } from "react";
import { useFetch } from "../hooks/useFetch";

type Journey = {
    departureStationName: string;
    returnStationName: string;
    duration: number;
    distance: number;
    departureDateTime: Date;
    returnDateTime: Date;
};

type Response = {
    nextCursor: number | null;
    journeys: Journey[];
};

export const JourneysTable = () => {
    const [cursor, setCursor] = useState<number | null>(null);
    const [nextCursor, setNextCursor] = useState<number | null>(null);
    const [filter, setFilter] = useState<string>("departure_station_name");
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const [limit, setLimit] = useState<number>(20);
    const params = useMemo(
        () => ({
            cursor,
            filter,
            order,
            limit,
        }),
        [cursor, filter, order, limit]
    );

    const { data, isLoading, error } = useFetch<Response | null>(
        `/journey/all`,
        params
    );

    useEffect(() => {
        if (data) {
            setNextCursor(data.nextCursor);
        }
    }, [data]);

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {data && (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <button
                                    onClick={() => {
                                        if (
                                            filter === "departure_station_name"
                                        ) {
                                            order === "asc"
                                                ? setOrder("desc")
                                                : setOrder("asc");
                                        } else {
                                            setFilter("departure_station_name");
                                        }
                                    }}
                                >
                                    Departure station
                                </button>
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
                        {data.journeys.map((journey, index) => (
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
                                    {new Date(
                                        journey.returnDateTime
                                    ).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default JourneysTable;
