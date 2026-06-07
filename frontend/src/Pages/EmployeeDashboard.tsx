import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import type { Transaction } from "./Home";
// interface Transaction {
//     id: string;
//     amount: number;
//     currency: string;
//     payeeAccountNumber: string;
//     createdAt?: string;
//     beneficiaryName?: string;
//     status: string;
// }
export default function EmployeeDashboard() {
    const navigate = useNavigate();
    const [payments, setPayments] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            
            const fetchPayments = async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_All_PAYMENTS_URL}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
        
                    const data = await response.json();
                    setPayments(data);
                    console.log("Fetched payments:", data);
                } catch (error) {
                    console.error("Error fetching payments", error);
                } finally {
                    setLoading(false);
                }
            };
    
             fetchPayments();
         }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (

        // <div className="p-8">

            

            <div className="min-h-screen bg-gray-100 p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Employee Dashboard
                </h1>
            <Link
                to="/PendingPayments"
                className="border-2 border-blue-900 px-6 py-4 rounded hover:bg-blue-900 hover:text-white"
            >
                View Pending Payments
            </Link>

                <button
                    onClick={handleLogout}
                    className="bg-black cursor-pointer text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>

            

            {/* payments Section */}
            <div className="bg-white shadow-md rounded-xl p-4">
                <h2 className="text-lg font-semibold mb-4">
                    All Transactions
                </h2>

                {loading ? (
                    <div className="flex justify-center">
                        <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : payments.length === 0 ? (
                    <p className="text-gray-500 text-center">
                        No transactions found.
                    </p>
                ) : (
                    <table className="w-full h-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2">Amount</th>
                                <th>Currency</th>
                                <th>Payee</th>
                                <th>Date</th>
                                <th>Status</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((t) => (
                                <tr key={t.id} className="border-b">
                                    <td className="py-2">{t.amount}</td>
                                    <td>{t.currency}</td>
                                    <td>{t.beneficiaryName}</td>
                                    <td>{t.createdAt?.split("T")[0]}</td>
                                    <td>{t.status}</td>
                                </tr>
                            )).toReversed()}
                        </tbody>
                    </table>
                )}
            </div>

           

        </div>
        // </div>

    );
}