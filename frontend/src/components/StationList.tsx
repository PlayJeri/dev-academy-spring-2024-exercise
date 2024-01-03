import React from "react";
import { useState } from "react";
import { StationData } from "../types";
import { Link } from "react-router-dom";
import { PaginationButton } from "./PaginationButton";

type StationListProps = {
    stations: StationData[];
    setStations: React.Dispatch<React.SetStateAction<StationData[] | null>>;
};

export const StationList: React.FC<StationListProps> = ({
    stations,
    setStations,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const itemsPerPage = 12;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = stations.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(stations.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleOrderChange = () => {
        console.log("order change");
        setOrder(order === "asc" ? "desc" : "asc");
        setStations([...stations].reverse());
    };

    const renderStationLink = (station: StationData) => {
        return (
            <Link to={`/station/${station.id}`} key={station.id}>
                <div className="p-4 bg-yellow-500 rounded-xl shadow">
                    <h2 className="font-bold text-xl text-neutral-800">
                        {station.name}
                    </h2>
                    <p className="text-neutral-700">{station.address}</p>
                </div>
            </Link>
        );
    };

    return (
        <>
            <div className="py-8 grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1000px] mx-auto px-4">
                {currentItems.map(renderStationLink)}
            </div>
            <div className="flex justify-center gap-5 py-8">
                <PaginationButton
                    condition={currentPage === 1}
                    buttonText="Previous"
                    handleClick={() => handlePageChange(currentPage - 1)}
                />
                <PaginationButton
                    condition={currentPage === totalPages}
                    buttonText="Next"
                    handleClick={() => handlePageChange(currentPage + 1)}
                />
                <button
                    key="order"
                    className="bg-slate-100 text-slate-800 px-4 py-2 rounded shadow"
                    onClick={() => handleOrderChange()}
                >
                    {order === "asc" ? "A to Z" : "Z to A"}
                </button>
            </div>
        </>
    );
};
