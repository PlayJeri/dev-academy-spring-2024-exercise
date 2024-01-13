import LocationIcon from "../assets/LocationIcon.svg?react";
import BikerIcon from "../assets/BikerIcon.svg?react";
import RouteIcon from "../assets/RouteIcon.svg?react";
import { InfoBannerData } from "../types";
import { convertDistance } from "../utils";

interface StatItemProps {
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    label: string;
    count: string;
}

const StatItem: React.FC<StatItemProps> = ({ Icon, label, count }) => {
    return (
        <div className="flex items-center">
            <Icon className="h-24 w-24 fill-yellow-600 hidden sm:block" />
            <div className="flex flex-col items-center justify-center sm:w-1/3">
                <Icon className="h-24 w-24 fill-yellow-600 sm:hidden absolute z-0" />
                <h1 className="font-bold text-3xl z-10">{count}</h1>
                <h2 className="text-xl font-bold z-10">{label}</h2>
            </div>
        </div>
    );
};

interface StatInfoBannerProps {
    stats: InfoBannerData;
}

export const StatInfoBanner: React.FC<StatInfoBannerProps> = ({ stats }) => {
    return (
        <div className="flex w-full py-4 items-center justify-around bg-yellow-500 text-neutral-800">
            <StatItem
                Icon={LocationIcon}
                label={"Stations"}
                count={stats.numberOfStations.toLocaleString()}
            />
            <StatItem
                Icon={BikerIcon}
                label={"Journeys"}
                count={stats.numberOfJourneys.toLocaleString()}
            />
            <StatItem
                Icon={RouteIcon}
                label={"Kilometers"}
                count={convertDistance(stats.totalDistance, false)}
            />
        </div>
    );
};
