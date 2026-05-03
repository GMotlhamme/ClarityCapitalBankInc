import axios from "axios";
import { Link, useNavigate } from "react-router";

export default function Register() {
    const navigate = useNavigate();

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
        }
    }

    return (
        <>
            <section className="px-8 mb-20 lg:p-18 lg:px-120 md:p-10 text-base md:text-lg lg:text-2xl">
                <div className="flex justify-center -m-8 -mt-12">
                    <img src="./ClarityCapital.png" className="object-contain h-80" alt="logo" />
                </div>
                <form className="-mt-14 " onSubmit={registerUser}>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="">Username</label>
                        <input className="p-4 border-2 border-neutral-700 rounded" name="username" required type="text" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="">Full Name</label>
                        <input className="p-4 border-2 border-neutral-700 rounded" name="fullName" required type="text" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="">ID Number</label>
                        <input className="p-4 border-2 border-neutral-700 rounded" maxLength={13} name="idNumber" required type="tel" pattern="[0-9]*"
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''); // Ensure only numbers
                            }} />
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

                    <button className="w-full mt-4 p-4 border-2 rounded text-xl text-blue-950 border-blue-900">Create Account!</button>
                </form>
                <div className="flex mt-4">
                    <Link to="/Login" className="text-center w-full cursor-pointer">Already registered? Sign In</Link>
                </div>
            </section>
        </>
    )
}