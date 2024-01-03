import { Link } from "react-router-dom";
import BikeIcon from "../assets/BikeIcon.svg?react";
import MenuIcon from "@mui/icons-material/Menu";
import { MobileNavBar } from "./MobileNavBar";
import { useState } from "react";

export function NavBar() {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    return (
        <>
            <div className="flex w-full bg-blue-600 text-slate-50 h-16 items-center px-8 justify-between sticky top-0 z-10">
                <BikeIcon className="fill-blue-700 h-auto w-24 absolute z-0 left-0" />
                <h1 className="font-light text-2xl z-10 linkHover hover:text-3xl">
                    <Link to={"/"}>City Bikes</Link>
                </h1>
                <h2 className="text-lg linkHover hover:text-xl font-light hidden sm:block">
                    <Link to={"/stations"}>Stations</Link>
                </h2>
                <h2 className="text-lg linkHover hover:text-xl font-light hidden sm:block">
                    <Link to={"/journeys"}>Journeys</Link>
                </h2>
                <input
                    className="hidden sm:block font-semibold text-slate-600 rounded-md border-2 p-1 border-gray-300 focus:outline-none focus:border-blue-700"
                    type="text"
                    placeholder="Search..."
                />
                <div
                    className="block sm:hidden"
                    onClick={() => setMobileNavOpen(!mobileNavOpen)}
                >
                    <MenuIcon fontSize="large" />
                </div>
            </div>
            {mobileNavOpen && <MobileNavBar />}
        </>
    );
}
