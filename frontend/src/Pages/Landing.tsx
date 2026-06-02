import { Link } from "react-router";

export default function Landing() {
    return (
        <>
            <section className="text-blue-950 text-base w-full h-full flex flex-col lg:flex-row lg:items-center lg:justify-center gap-8">
                <img src="./ClarityCapital.png" className="object-contain md:h-120 lg:h-150" alt="logo" />

                <section className="flex flex-col items-center text-center lg:w-1/3 -mt-18 md:justify-start lg:mt-auto ">

                    <div className="flex flex-col justify-center lg:text-center lg:items-center gap-8 p-8 ">

                        <p className="text-2xl ">Experience transparent, efficient, and secure financial management.</p>
                        <div className="flex flex-row w-full gap-4">

                            <Link className="border-2 border-blue-600 hover:bg-blue-700 cursor-pointer w-full text-start py-4 px-4 text-xl rounded transition delay-75 hover:text-white" to={"/Register"}>Sign Up</Link>
                            <Link className="border-2 border-blue-600 hover:bg-blue-700 cursor-pointer w-full text-start py-4 px-4 text-xl rounded transition delay-75 hover:text-white" to={"/Login"}>Log in</Link>
                            <Link className="border-2 border-blue-600 hover:bg-blue-700 cursor-pointer w-full text-start py-4 px-4 text-xl rounded transition delay-75 hover:text-white" to={"/EmployeeLogin"}>Employee Portal</Link>
                        
                            
                        </div>
                    </div>

                    <section className="flex p-8 gap-4 ">
                        <div className="flex flex-col gap-2 text-center">
                            <i className="bi bi-globe text-4xl"></i>
                            <p>Global SWIFT Transfers</p>
                        </div>
                        <div className="flex flex-col gap-2 text-center">
                            <i className="bi bi-lock text-4xl"></i>
                            <p>Advanced Security</p>
                        </div>
                        <div className="flex flex-col justify-center gap-2 text-center">
                            <i className="bi bi-clock-history text-4xl"></i>
                            <p >24/7 Management</p>
                        </div>
                    </section>
                </section>
            </section>
        </>
    )
}