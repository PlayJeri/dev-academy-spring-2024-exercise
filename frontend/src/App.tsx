import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AllStationsPage } from "./pages/AllStationsPage";
import { NavBar } from "./components/NavBar";
import { StationPage } from "./pages/StationPage";
import { JourneyPage } from "./pages/JourneyPage";

export default function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/stations" element={<AllStationsPage />} />
                <Route path="/station/:stationId" element={<StationPage />} />
                <Route path="/journeys" element={<JourneyPage />} />
            </Routes>
        </BrowserRouter>
    );
}
