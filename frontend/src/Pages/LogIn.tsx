import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Login(){
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
     async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const username = formData.get("username") as string;
        const accountNumber = formData.get("accountNumber") as string;
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_LOGIN_URL}`, {
                email,
                password,
                username,
                accountNumber
            });
            localStorage.setItem("token", response.data.token);
            navigate("/Home");
        } catch (error) {
            console.error("Login failed:", error);
            let message;
            if(axios.isAxiosError(error) && error.response?.status === 400) {
                message = "Invalid credentials.";
                setErrorMessage(message);
                return;
            }
            if(password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
                message = "Password must be at least 8 characters long, contain at least one uppercase letter and one number.";
                setErrorMessage(message);
                return;
            }
            setErrorMessage("Login failed. Please try again. Ensure your credentials are correct and meet the requirements.");
        } finally {
            setLoading(false);
        }
    }
    return(
        <>
        <section>
            <div className="flex flex-col items-center justify-center gap-4 pt-8 transition-all duration-300">
            <img src="./ClarityLogo.png" className="object-contain h-40" alt="logo" />

            </div>

            <section className="p-8 lg:p-18 lg:px-120 md:p-10">

            <h3 className="text-4xl text-blue-950 text-center mb-8">Welcome Back!!</h3>
            <form  onSubmit={handleLogin}>
                {errorMessage && <p className="text-red-800 mb-4">{errorMessage}</p>}
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="">Username</label>
                    <input disabled={loading} className="p-4  border-2 border-neutral-700 rounded" name="username" required type="text" />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="">Account Number</label>
                    <input disabled={loading} className="p-4 border-2 border-neutral-700 rounded" name="accountNumber" required type="tel" pattern="[0-9]{10,12}" onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''); // Ensure only numbers
                            }} />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="">Email</label>
                    <input disabled={loading} className="p-4 border-2 border-neutral-700 rounded" name="email" required type="email" />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    {errorMessage.includes("credentials") && <p className="text-red-800 mb-2">{errorMessage}</p>}
                    <label htmlFor="">Password</label>
                    <input disabled={loading} className="p-4 border-2 border-neutral-700 rounded" name="password" required type="password" />
                </div>

                <button disabled={loading} className="w-full mt-8 p-4 border-2 rounded text-xl text-blue-950 border-blue-900 cursor-pointer hover:bg-blue-700 hover:text-white transition delay-75">
                    {loading ? "Signing In..." : "Sign In"}
                </button>
            </form>

            <div className="flex mt-8">
                <button disabled={loading} className="text-center  w-full  cursor-pointer hover:bg-blue-700 hover:text-white transition delay-200 py-2 rounded">Forgot Password?</button>
                <Link to="/Register" className="text-center w-full cursor-pointer hover:bg-blue-700 hover:text-white transition delay-200 py-2 rounded">Create Account</Link>
            </div>
            </section>
        </section>
        </>
    )
}