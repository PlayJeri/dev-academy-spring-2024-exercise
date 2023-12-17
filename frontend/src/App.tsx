import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AllStationsPage } from "./pages/AllStationsPage";
import { NavBar } from "./components/NavBar";

export default function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/stations" element={<AllStationsPage />} />
            </Routes>
        </BrowserRouter>
    );
}
