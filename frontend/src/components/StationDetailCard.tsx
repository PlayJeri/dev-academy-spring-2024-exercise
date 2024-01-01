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
        <div className="flex flex-col justify-between text-center bg-yellow-500 md:h-44 h-36 text-neutral-800 rounded-xl p-4 shadow">
            <React.Fragment key={title}>
                <h1 className="md:text-3xl text-xl font-bold">{title}</h1>
                {values.map((value) => (
                    <h2 key={value} className="my-auto md:text-xl text-lg">
                        {value}
                    </h2>
                ))}
            </React.Fragment>
        </div>
    );
};
