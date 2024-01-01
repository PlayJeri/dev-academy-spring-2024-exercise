import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

export const useFetch = <DataType,>(url: string) => {
    const [data, setData] = useState<DataType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (err) {
                setError(err as AxiosError);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, setData, isLoading, error };
};
