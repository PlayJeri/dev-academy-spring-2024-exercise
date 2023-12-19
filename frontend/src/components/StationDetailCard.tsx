import React from "react";

type StationDetailCardProps = {
    title: string;
    values: Array<string | number>;
};

export const StationDetailCard: React.FC<StationDetailCardProps> = ({
    title,
    values,
}) => {
    return (
        <div className="flex flex-col justify-between text-center bg-blue-600 h-44 text-white rounded-xl p-4 shadow">
            <React.Fragment key={title}>
                <h1 className="text-3xl font-bold">{title}</h1>
                {values.map((value) => (
                    <h2 key={value} className="my-auto text-xl">
                        {value}
                    </h2>
                ))}
            </React.Fragment>
        </div>
    );
};
