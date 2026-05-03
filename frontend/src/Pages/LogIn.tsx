import axios from "axios";
import { Link, useNavigate } from "react-router";

export default function Login(){
    const navigate = useNavigate();
     async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const username = formData.get("username") as string;
        const accountNumber = formData.get("accountNumber") as string;
        try {
            
            const response = await axios.post(`${import.meta.env.VITE_LOGIN_URL}`, {
                email,
                password,
                username,
                accountNumber
            });
            
            localStorage.setItem("token", response.data.token);
            navigate("/PaymentGate");
        } catch (error) {
            console.error("Login failed:", error);
        }
    }
    return(
        <>
        <section>
            <div className="flex flex-col items-center justify-center gap-4 pt-8 transition-all duration-300">
            <img src="/Claritylogo.png" className="object-contain h-40" alt="logo" />

            </div>

            <section className="p-8 lg:p-18 lg:px-120 md:p-10">

            <h3 className="text-4xl text-blue-950 text-center mb-8">Welcome Back!!</h3>
            <form  onSubmit={handleLogin}>
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="">Username</label>
                    <input className="p-4  border-2 border-neutral-700 rounded" name="username" required type="text" />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="">Account Number</label>
                    <input className="p-4 border-2 border-neutral-700 rounded" name="accountNumber" required type="number" />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="">Email</label>
                    <input className="p-4 border-2 border-neutral-700 rounded" name="email" required type="email" />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="">Password</label>
                    <input className="p-4 border-2 border-neutral-700 rounded" name="password" required type="password" />
                </div>

                <button className="w-full mt-8 p-4 border-2 rounded text-xl text-blue-950 border-blue-900">Sign In</button>
            </form>

            <div className="flex mt-8">
                <button className="text-center  w-full  cursor-pointer">Forgot Password?</button>
                <Link to="/Register" className="text-center w-full cursor-pointer">Create Account</Link>
            </div>
            </section>
        </section>
        </>
    )
}