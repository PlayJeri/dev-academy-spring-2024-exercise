import { useFetch } from "../hooks/useFetch";
import { JourneysResponse } from "../types";
import { JourneysTable } from "../components/JourneysTable";

export const JourneyPage = () => {
    const { data, isLoading, error } = useFetch<JourneysResponse | null>(
        "/journey/all"
    );

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {data && <JourneysTable journeys={data.journeys} />}
        </>
    );
};
