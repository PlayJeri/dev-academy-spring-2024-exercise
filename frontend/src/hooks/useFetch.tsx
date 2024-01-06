import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

type Params = {
    [key: string]: string | number | boolean | null;
};

export const useFetch = <DataType, ParamsType = Params>(
    url: string,
    params?: ParamsType
) => {
    const [data, setData] = useState<DataType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<DataType>(url, { params });
                setData(response.data);
            } catch (err) {
                setError(err as AxiosError);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, params]);

    return { data, setData, isLoading, error };
};
