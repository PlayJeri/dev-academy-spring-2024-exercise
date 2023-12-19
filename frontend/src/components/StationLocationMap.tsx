import { useEffect } from "react";
import L from "leaflet";

interface MapProps {
    x: number;
    y: number;
}

export const StationLocationMap = ({ x, y }: MapProps) => {
    useEffect(() => {
        const link = document.createElement("link");
        link.href = "https://unpkg.com/leaflet@1.9.3/dist/leaflet.css";
        link.rel = "stylesheet";
        document.head.appendChild(link);

        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.3/dist/leaflet.js";
        script.async = true;
        script.onload = () => {
            const map = L.map("map").setView([y, x], 50);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
                maxZoom: 18,
            }).addTo(map);

            L.marker([y, x]).addTo(map);
        };
        document.body.appendChild(script);

        return () => {
            document.head.removeChild(link);
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div
            className="lg:h-[560px] h-96 rounded-3xl shadow border z-0"
            id="map"
        ></div>
    );
};
