export default function PaymentGate() {
    return (
        <>
            <section className="flex flex-col gap-8 p-8 lg:py-20 lg:px-80">
                <form className="border-2 border-neutral-700 p-8 rounded" action="">
                        <div className="flex flex-col gap-2 mb-4">
                            <label htmlFor="">Beneficiary Name</label>
                            <input className="p-4 border-2 border-neutral-700 rounded" required type="text" />
                        </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="">Amount</label>
                        <input className="p-4 border-2 border-neutral-700 rounded" required type="number" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="">Account Number</label>
                        <input className="p-4 border-2 border-neutral-700 rounded" required type="number" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="">Currency</label>
                        <select className="p-4 border-2 border-neutral-700 rounded w-full" required name="" id="">
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
                            <input className="p-4 border-2 border-neutral-700 rounded" required type="text" />
                        </div>
                        <div className="flex flex-col gap-2 mb-4">
                            <label htmlFor="">Swift code</label>
                            <input className="p-4 border-2 border-neutral-700 rounded" type="number" required />
                        </div>
                        <button className="flex justify-center w-full border-2 border-blue-800 text-blue-950 rounded p-4 cursor-pointer">Pay Now</button>
                    </form>
                </section>


        </>
    )
}