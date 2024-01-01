type PaginationButtonProps = {
    condition: boolean;
    buttonText: string;
    handleClick: () => void;
};

export const PaginationButton = ({
    condition,
    buttonText,
    handleClick,
}: PaginationButtonProps) => {
    return (
        <button
            key={buttonText}
            className={`${
                condition ? "bg-gray-600" : "bg-blue-500"
            } text-white px-4 py-2 rounded shadow`}
            onClick={handleClick}
            disabled={condition}
        >
            {buttonText}
        </button>
    );
};
