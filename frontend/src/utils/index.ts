type Seconds = number;
type Meters = number;

export const convertDuration = (duration: Seconds): string => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
};

export const convertDistance = (
    distance: Meters,
    accurate: boolean = true
): string => {
    const kilometers = distance / 1000;
    if (kilometers < 1) return distance ? `${distance}m` : "0m";
    if (!accurate) return `${Math.floor(kilometers).toLocaleString()}km`;

    return `${kilometers.toFixed(2)}km`;
};
