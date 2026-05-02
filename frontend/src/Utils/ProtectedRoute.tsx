import { Navigate } from "react-router";
import {  useState, type JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);


    const token = localStorage.getItem("token");
    if (token === "undefined" || token === null) {
        setIsAuthenticated(false);
    }
    else { setIsAuthenticated(true) }


    if (isAuthenticated === null) return <div>Loading...</div>; // Still checking
    if (!isAuthenticated) return <Navigate to="/Login" replace />; // Not logged in
    return children; // Logged in, show page
}