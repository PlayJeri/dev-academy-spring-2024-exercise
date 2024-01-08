import { useMemo, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { SortableHeader } from "./SortableHeader";
import { convertDistance, convertDuration } from "../utils";
import { PaginationButton } from "./PaginationButton";

type Journey = {
    departureStationName: string;
    returnStationName: string;
    duration: number;
    distance: number;
    departureDateTime: Date;
    returnDateTime: Date;
};

export const JourneysTable = () => {
    const [limit] = useState<number>(30);
    const [offset, setOffset] = useState<number>(limit);
    const [filter, setFilter] = useState<string>("departure_station_name");
    const [order, setOrder] = useState<"asc" | "desc">("asc");
    const params = useMemo(
        () => ({
            offset,
            filter,
            order,
            limit,
        }),
        [offset, filter, order, limit]
    );

    const { data, isLoading, error } = useFetch<Journey[] | null>(
        `/journey/all`,
        params
    );

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {data && (
                <div>
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
                            {data.map((journey, index) => (
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
                    <div className="flex justify-center">
                        <PaginationButton
                            condition={offset <= 0}
                            buttonText="Previous"
                            handleClick={() =>
                                setOffset(
                                    offset - limit >= 0 ? offset - limit : 0
                                )
                            }
                        />
                        <PaginationButton
                            condition={data.length < limit}
                            buttonText="Next"
                            handleClick={() => setOffset(offset + limit)}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default JourneysTable;
