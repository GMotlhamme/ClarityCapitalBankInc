import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export interface Transaction {
    id: string;
    amount: number;
    currency: string;
    payeeAccountNumber: string;
    createdAt?: string;
    beneficiaryName?: string;
    status: string;
}

 export default function Home()  {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {
        
        const fetchTransactions = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_PAYMENT_URL}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
    
                const data = await response.json();
                setTransactions(data);
                console.log("Fetched transactions:", data);
            } catch (error) {
                console.error("Error fetching transactions", error);
            } finally {
                setLoading(false);
            }
        };

         fetchTransactions();
     }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Dashboard
                </h1>

                <button
                    onClick={handleLogout}
                    className="bg-black cursor-pointer text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>

            {/* Create Transaction */}
            <div className="mb-6">
                <button
                    onClick={() => navigate("/PaymentGate")}
                    className="border-2 border-blue-700 text-blue-900 cursor-pointer hover:bg-blue-700 hover:text-white transition delay-75 px-4 py-2 rounded"
                >
                     Create Transaction
                </button>
            </div>

            {/* Transactions Section */}
            <div className="bg-white shadow-md rounded-xl p-4">
                <h2 className="text-lg font-semibold mb-4">
                    Your Transactions
                </h2>

                {loading ? (
                    <div className="flex justify-center">
                        <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : transactions.length === 0 ? (
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
                            {transactions.map((t) => (
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
    );
};



