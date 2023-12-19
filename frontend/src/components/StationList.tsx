import React from "react";
import { useState } from "react";
import { StationData } from "../types";
import { Link } from "react-router-dom";

type StationListProps = {
    stations: StationData[];
    setStations: React.Dispatch<React.SetStateAction<StationData[]>>;
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

    return (
        <>
            <div className="py-8 grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1000px] mx-auto px-4">
                {currentItems.map((station) => (
                    <Link to={`/station/${station.id}`}>
                        <div
                            key={station.id}
                            className="p-4 bg-blue-600 rounded shadow"
                        >
                            <h2 className="font-bold text-xl text-white">
                                {station.name}
                            </h2>
                            <p className="text-white">{station.address}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="flex justify-center gap-5 py-8">
                <button
                    className={`${
                        currentPage === 1 ? "bg-gray-600" : "bg-blue-500"
                    } text-white px-4 py-2 rounded shadow`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className={`${
                        currentPage === totalPages
                            ? "bg-gray-600"
                            : "bg-blue-500"
                    } text-white px-4 py-2 rounded shadow`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
                <button
                    className="bg-slate-100 text-slate-800 px-4 py-2 rounded shadow"
                    onClick={() => handleOrderChange()}
                >
                    {order === "asc" ? "A to Z" : "Z to A"}
                </button>
            </div>
        </>
    );
};
