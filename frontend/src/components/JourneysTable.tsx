import { useEffect, useMemo, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { SortableHeader } from "./SortableHeader";
import { convertDistance, convertDuration } from "../utils";

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
                                <SortableHeader
                                    filter={filter}
                                    setFilter={setFilter}
                                    order={order}
                                    setOrder={setOrder}
                                    filterValue="departure_station_name"
                                >
                                    Departure station
                                </SortableHeader>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <SortableHeader
                                    filter={filter}
                                    setFilter={setFilter}
                                    order={order}
                                    setOrder={setOrder}
                                    filterValue="return_station_name"
                                >
                                    Return station
                                </SortableHeader>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <SortableHeader
                                    filter={filter}
                                    setFilter={setFilter}
                                    order={order}
                                    setOrder={setOrder}
                                    filterValue="duration"
                                >
                                    Duration
                                </SortableHeader>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <SortableHeader
                                    filter={filter}
                                    setFilter={setFilter}
                                    order={order}
                                    setOrder={setOrder}
                                    filterValue="distance"
                                >
                                    Distance
                                </SortableHeader>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <SortableHeader
                                    filter={filter}
                                    setFilter={setFilter}
                                    order={order}
                                    setOrder={setOrder}
                                    filterValue="departure_date_time"
                                >
                                    Departure Time
                                </SortableHeader>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <SortableHeader
                                    filter={filter}
                                    setFilter={setFilter}
                                    order={order}
                                    setOrder={setOrder}
                                    filterValue="return_date_time"
                                >
                                    Return Time
                                </SortableHeader>
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
                                    {convertDuration(journey.duration)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {convertDistance(journey.distance)}
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
