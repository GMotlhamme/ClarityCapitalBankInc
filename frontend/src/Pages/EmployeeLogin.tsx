import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function EmployeeLogin() {

    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {

        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        const email = formData.get("email");
        const password = formData.get("password");

        try {

            setLoading(true);

            const response = await axios.post(
                `${import.meta.env.VITE_EMPLOYEE_LOGIN_URL}`,
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "employeeToken",
                response.data.token
            );

            navigate("/EmployeeDashboard");

        } catch {

            setError("Invalid employee credentials");

        } finally {

            setLoading(false);

        }
    }

    return (

        <section>

            <div className="flex flex-col items-center pt-8">
                <img
                    src="./ClarityLogo.png"
                    className="h-40"
                    alt="logo"
                />
            </div>

            <section className="p-8 lg:px-120">

                <h3 className="text-4xl text-blue-950 text-center mb-8">
                    Employee Portal
                </h3>

                <form onSubmit={handleLogin}>

                    {error &&
                        <p className="text-red-700 mb-4">
                            {error}
                        </p>
                    }

                    <div className="mb-4">
                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full p-4 border-2 border-neutral-700 rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full p-4 border-2 border-neutral-700 rounded"
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="w-full mt-8 p-4 border-2 rounded text-xl text-blue-950 border-blue-900 hover:bg-blue-700 hover:text-white"
                    >
                        {loading ? "Signing In..." : "Employee Sign In"}
                    </button>

                </form>

            </section>

        </section>
    );
}