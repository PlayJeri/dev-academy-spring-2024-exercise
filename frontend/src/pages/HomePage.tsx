import { HomePageInfoCard } from "../components/HomePageInfoCard";
import { StatInfoBanner } from "../components/StatInfoBanner";

export const HomePage = () => {
    return (
        <div className="flex flex-col items-center h-screen">
            <HomePageInfoCard />
            <StatInfoBanner />
        </div>
    );
};
