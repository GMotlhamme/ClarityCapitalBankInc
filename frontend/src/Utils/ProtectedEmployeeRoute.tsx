import { Navigate } from "react-router";

export default function ProtectedEmployeeRoute({
    children
}: {
    children: React.ReactNode
}) {

    const token =
        localStorage.getItem("employeeToken");

    return token
        ? children
        : <Navigate to="/EmployeeLogin" />;
}