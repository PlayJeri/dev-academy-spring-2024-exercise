import { StationList } from "../components/StationList";
import { StationData } from "../types/";

import { useFetch } from "../hooks/useFetch";

export const AllStationsPage = () => {
    const {
        data: stations,
        setData: setStations,
        isLoading,
        error,
    } = useFetch<StationData[] | null>("/station");

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {stations && (
                <StationList stations={stations} setStations={setStations} />
            )}
        </div>
    );
};
