import BikeIcon from "../assets/BikeIcon.svg?react";

export function NavBar() {
    return (
        <div className="flex w-full bg-blue-600 text-slate-50 h-16 items-center px-8 justify-between sticky top-0">
            <BikeIcon className="fill-blue-700 h-auto w-24 absolute z-0 left-0" />
            <h1 className="font-light text-2xl z-10">City bikes</h1>
            <h2 className="text-lg font-light">Stations</h2>
            <h2 className="text-lg font-light">Journeys</h2>
            <input
                className="rounded-md border-2 p-1 border-gray-300 focus:outline-none focus:border-blue-700"
                type="text"
                placeholder="Search..."
            />
        </div>
    );
}
