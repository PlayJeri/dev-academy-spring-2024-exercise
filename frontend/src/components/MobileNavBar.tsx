import { Link } from "react-router-dom";
import { StationData } from "../types";
import { SearchBar } from "./SearchBar";

type MobileNavBarProps = {
    stations: StationData[] | null;
    visible: boolean;
};

export const MobileNavBar: React.FC<MobileNavBarProps> = ({
    stations,
    visible,
}) => {
    return (
        <div className="sticky top-[64px] flex flex-col sm:hidden items-center w-full gap-4 bg-blue-600 z-10">
            <div className="flex w-full justify-around text-white">
                <h2 className="text-lg linkHover hover:text-xl font-light">
                    <Link to={"/stations"}>Stations</Link>
                </h2>
                <h2 className="text-lg linkHover hover:text-xl font-light">
                    Journeys
                </h2>
            </div>
            <div className="mb-4">
                <SearchBar stations={stations} visible={visible} />
            </div>
        </div>
    );
};
