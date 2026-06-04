import { Link } from "react-router";

export default function EmployeeDashboard() {

    return (

        <div className="p-8">

            <h1 className="text-4xl text-blue-950 mb-8">
                Employee Dashboard
            </h1>

            <Link
                to="/PendingPayments"
                className="border-2 border-blue-900 px-6 py-4 rounded hover:bg-blue-900 hover:text-white"
            >
                View Pending Payments
            </Link>

        </div>
    );
}