import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Register() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function registerUser(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const fullName = formData.get("fullName") as string;
        const idNumber = formData.get("idNumber") as string;
        const accountNumber = formData.get("accountNumber") as string;

        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_REGISTER_URL}`, {
                email,
                username,
                password,
                fullName,
                idNumber,
                accountNumber
            });
            localStorage.setItem("token", response.data.userToken);
            navigate("/Login");
        } catch (error) {
            console.error("Registration failed:", error);
            let message;
            if(axios.isAxiosError(error) && error.response?.status === 400) {
                message = "User already exists.";
                setErrorMessage(message);
                return;
            }
            if(password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
                message = "Password must be at least 8 characters long, contain at least one uppercase letter and one number.";
                setErrorMessage(message);
                return;
            }
            setErrorMessage("Registration failed. Please try again. Ensure your credentials are correct and meet the requirements.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <section className="px-8 mb-20 lg:p-18 lg:px-120 md:p-10 text-base md:text-lg lg:text-2xl">
                <div className="flex justify-center -m-8 -mt-12">
                    <img src="./ClarityCapital.png" className="object-contain h-80" alt="logo" />
                </div>
                <form className="-mt-14 " onSubmit={registerUser}>
                        {errorMessage && <p className="text-red-800 mb-4">{errorMessage}</p>}
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="">Username (no special characters)</label>
                        <input disabled={loading} className="p-4 border-2 border-neutral-700 rounded" name="username" required type="text" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="">Full Name</label>
                        <input disabled={loading} className="p-4 border-2 border-neutral-700 rounded" name="fullName" required type="text" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="">ID Number (must be 13 digits)</label>
                        <input disabled={loading} className="p-4 border-2 border-neutral-700 rounded" maxLength={13} name="idNumber" required type="tel" pattern="[0-9]*"
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''); // Ensure only numbers
                            }} />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="">Account Number (10 - 12 digits)</label>
                        <input disabled={loading} className="p-4 border-2 border-neutral-700 rounded" name="accountNumber" maxLength={12} required type="tel" pattern="[0-9]{10,12}" onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''); // Ensure only numbers
                            }} />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        {errorMessage.includes("User") && <p className="text-red-800 mb-2">{errorMessage}</p>}
                        <label htmlFor="">Email</label>
                        <input disabled={loading} className="p-4 border-2 border-neutral-700 rounded" name="email" required type="email" />
                    </div>

                    <div className="flex flex-col gap-2 mb-4">
                        {errorMessage.includes("Password") && <p className="text-red-800 mb-2">{errorMessage}</p>}
                        <label htmlFor="">Password</label>
                        <input disabled={loading} className="p-4 border-2 border-neutral-700 rounded" name="password" required type="password" />
                    </div>

                    <button className="w-full mt-4 p-4 border-2 rounded text-xl text-blue-950 border-blue-900 cursor-pointer hover:bg-blue-700 hover:text-white transition delay-75" disabled={loading}>
                        {loading ? "Creating Account..." : "Create Account!"}
                    </button>
                </form>
                <div className="flex mt-4">
                    <Link to="/Login" className="text-center w-full cursor-pointer hover:bg-blue-700 hover:text-white transition delay-200 py-2 rounded">Already registered? Sign In</Link>
                </div>
            </section>
        </>
    )
}