import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function PaymentGate() {
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    async function handlePayment(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const beneficiaryName = formData.get("beneficiaryName") as string;
        const Amount = formData.get("Amount") as string;
        const Currency = formData.get("Currency") as string;
        const PayeeAccountNumber = formData.get("PayeeAccountNumber") as string;
        const SwiftCode = formData.get("SwiftCode") as string;
            try {
                setLoader(true);
                axios.defaults.headers.common['Authorization']= `Bearer ${localStorage.getItem("token")}`;
                const response = await axios.post(`${import.meta.env.VITE_PAYMENT_URL}`, {
                    beneficiaryName,
                    Amount,
                    Currency,
                    PayeeAccountNumber,
                    SwiftCode
                });
                console.log("Payment successful:", response.data);
                navigate("/Home");
                setLoader(false);
            }catch( error){
                console.error("Payment failed:", error);
                setLoader(false);
            }
    }

    return (
        <>
            <section className="flex flex-col gap-8 p-8 lg:py-20 lg:px-80">
                <form className="border-2 border-neutral-700 p-8 rounded" action="" onSubmit={handlePayment}>
                        <div className="flex flex-col gap-2 mb-4">
                            <label htmlFor="">Beneficiary Name</label>
                            <input className="p-4 border-2 border-neutral-700 rounded" name="beneficiaryName" required type="text" />
                        </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="">Amount</label>
                        <input className="p-4 border-2 border-neutral-700 rounded" name="Amount" required type="number" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="">Account Number</label>
                        <input className="p-4 border-2 border-neutral-700 rounded" name="PayeeAccountNumber" required type="number" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="">Currency</label>
                        <select className="p-4 border-2 border-neutral-700 rounded w-full" required name="Currency" id="">
                            <option  disabled>Select Currency</option>
                            <option  value="EUR">EUR</option>
                            <option  value="USD">USD</option>
                            <option  value="YEN">YEN</option>
                            <option  value="CAD">CAD</option>
                        </select>
                    </div>
                    <div className="flex flex-col  gap-2 mb-4">
                        <label htmlFor="">Provider</label>
                        <div className="items-center flex gap-2">
                            <input className="accent-blue-500" readOnly type="radio" checked/>
                            <label htmlFor="">SWIFT</label>
                        </div>
                    </div>
                   
                        <div className="flex flex-col gap-2 mb-4">
                            <label htmlFor="">Branch Code</label>
                            <input className="p-4 border-2 border-neutral-700 rounded"  required type="text" />
                        </div>
                        <div className="flex flex-col gap-2 mb-4">
                            <label htmlFor="">Swift code</label>
                            <input className="p-4 border-2 border-neutral-700 rounded" name="SwiftCode" type="text" required />
                        </div>
                        <button disabled={loader} className="flex justify-center w-full border-2 border-blue-800 text-blue-950 rounded p-4 cursor-pointer">{loader ? "Processing..." : "Pay Now"}</button>
                    </form>
                </section>


        </>
    )
}