import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

interface Payment {
    id: number;
    beneficiaryName: string;
    amount: number;
    swiftCode: string;
    // add other fields returned by the API here if needed
}

export default function PendingPayments() {
    const navigate = useNavigate();
    const [payments, setPayments] = useState<Payment[]>([]);

    // Return data instead of calling setPayments directly
    async function loadPayments(): Promise<Payment[]> {
        try{

            const response =
            await axios.get<Payment[]>(
                `${import.meta.env.VITE_PENDING_PAYMENTS_URL}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error loading payments", error);
            throw error; // rethrow to be caught in the caller
        }

    }

    async function verifyPayment(
        paymentId: number,
        approved: boolean
    ) {
        await axios.put(
            `${import.meta.env.VITE_VERIFY_PAYMENT_URL}`,
            {
                paymentId,
                approved
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        // After verify, reload and set state from the async result
        try {
            const data = await loadPayments();
            setPayments(data);
            navigate("/EmployeeDashboard"); 
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        let mounted = true;

        // Call loadPayments and set state in the async callback (not synchronously in effect body)
        loadPayments()
            .then((data) => {
                if (mounted) setPayments(data);
            })
            .catch((err) => {
                console.error(err);
            });

        return () => {
            mounted = false;
        };
    }, []);

    return (

        <div className="p-8">

            <h1 className="text-4xl text-blue-950 mb-8">
                Pending Payments
            </h1>

            <table className="w-full border">

                <thead>

                    <tr className="bg-blue-950 text-white">

                        <th className="p-4">Beneficiary</th>

                        <th className="p-4">Amount</th>

                        <th className="p-4">SWIFT</th>

                        <th className="p-4">Action</th>

                    </tr>

                </thead>

                <tbody>

                    {payments.map((payment: Payment) => (

                        <tr key={payment.id}>

                            <td className="p-4">
                                {payment.beneficiaryName}
                            </td>

                            <td className="p-4">
                                R {payment.amount}
                            </td>

                            <td className="p-4 font-bold">
                                {payment.swiftCode}
                            </td>

                            <td className="p-4">

                                <button
                                    onClick={() =>
                                        verifyPayment(
                                            payment.id,
                                            true
                                        )
                                    }
                                    className="bg-green-600 text-white px-4 py-2 mr-2 rounded"
                                >
                                    Approve
                                </button>

                                <button
                                    onClick={() =>
                                        verifyPayment(
                                            payment.id,
                                            false
                                        )
                                    }
                                    className="bg-red-600 text-white px-4 py-2 rounded"
                                >
                                    Reject
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}