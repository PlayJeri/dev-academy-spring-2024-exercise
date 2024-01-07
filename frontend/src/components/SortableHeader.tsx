import React from "react";

type SortableHeaderProps = {
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    order: "asc" | "desc";
    setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
    filterValue: string;
    children: React.ReactNode;
};

export const SortableHeader: React.FC<SortableHeaderProps> = ({
    filter,
    setFilter,
    order,
    setOrder,
    filterValue,
    children,
}) => {
    return (
        <button
            onClick={() => {
                if (filter === filterValue) {
                    order === "asc" ? setOrder("desc") : setOrder("asc");
                } else {
                    setFilter(filterValue);
                }
            }}
        >
            {children}
        </button>
    );
};
