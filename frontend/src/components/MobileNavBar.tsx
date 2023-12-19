import { Link } from "react-router-dom";

export const MobileNavBar = () => {
    return (
        <div className="sticky top-[64px] flex flex-col sm:hidden items-center w-full gap-4 bg-blue-600">
            <input
                className="font-semibold text-slate-600  mt-4 w-3/4 rounded-md border-2 p-1 border-gray-300 focus:outline-none focus:border-blue-700"
                type="text"
                placeholder="Search..."
            />
            <div className="flex w-full justify-around text-white pb-4">
                <h2 className="text-lg linkHover hover:text-xl font-light">
                    <Link to={"/stations"}>Stations</Link>
                </h2>
                <h2 className="text-lg linkHover hover:text-xl font-light">
                    Journeys
                </h2>
            </div>
        </div>
    );
};
