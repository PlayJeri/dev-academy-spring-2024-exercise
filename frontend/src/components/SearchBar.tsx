import React, { useEffect, useState } from "react";
import { StationData } from "../types";
import { Link } from "react-router-dom";

type SearchBarProps = {
    stations: StationData[] | null;
    visible: boolean;
};

export const SearchBar: React.FC<SearchBarProps> = ({ stations, visible }) => {
    const [stationSearch, setStationSearch] = useState("");
    const [filteredStations, setFilteredStations] = useState<StationData[]>([]);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (stations) {
            setFilteredStations(
                stations.filter((station) =>
                    station.name
                        .toLowerCase()
                        .includes(stationSearch.toLowerCase())
                )
            );
        }
    }, [stationSearch, stations]);

    return (
        <div className="relative">
            <input
                className={`${
                    visible ? "" : "hidden"
                } font-semibold text-slate-600 rounded-md border-2 p-1 border-gray-300 focus:outline-none focus:border-blue-700`}
                type="text"
                placeholder="Search..."
                value={stationSearch}
                onChange={(e) => setStationSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {isFocused && (
                <div className="absolute top-10 left-0 w-full bg-white rounded-md shadow-md">
                    <ul
                        className="divide-y divide-gray-300 text-slate-700"
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        {filteredStations?.slice(0, 5).map((station) => (
                            <li key={station.id}>
                                <Link
                                    className="block p-2 hover:bg-gray-100"
                                    to={`/station/${station.id}`}
                                >
                                    {station.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
