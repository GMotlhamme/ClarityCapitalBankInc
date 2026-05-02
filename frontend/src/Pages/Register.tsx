import { Link } from "react-router";

export default function Register() {

    async function registerUser(){
        window.location.href = "/Login";
    }

    return (
        <>
            <section className="px-8 lg:p-18 md:p-10 text-base md:text-lg lg:text-2xl">
                <div className="flex justify-center -m-8 -mt-12">
                    <img src="/public/ClarityCapital.png" className="object-contain h-80" alt="logo" />
                </div>
                <form className="-mt-14 " onSubmit={registerUser}>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="">Username</label>
                        <input className="p-4 border-2 border-neutral-700 rounded" required type="text" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="">ID Number</label>
                        <input className="p-4 border-2 border-neutral-700 rounded" required type="number" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="">Account Number</label>
                        <input className="p-4 border-2 border-neutral-700 rounded" required type="number" />
                    </div>

                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="">Password</label>
                        <input className="p-4 border-2 border-neutral-700 rounded" required type="password" />
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