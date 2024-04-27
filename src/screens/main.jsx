import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import Dashboard from "./Dashboard";
import Chart from "./Chart";
import About from "./About";


export default function Main() {
    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <Routes>
                    <Route path="/Chart" element={<Chart />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    )
}