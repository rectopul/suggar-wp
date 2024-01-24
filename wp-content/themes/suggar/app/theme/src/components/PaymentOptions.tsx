import { Cards, Pix } from "../assets/Icons";

export function PaymentOptions() {
    return (
        <div className="w-full flex flex-col my-3 overflow-hidden rounded-lg shadow">
            <header className="bg-gray-200 flex flex-col px-4 py-2">
                <div className="flex items-center">
                    <figure>
                        <Cards size={35} className="mr-4" />
                    </figure>
                    <div>
                        Parcele suas compras
                        <p className="text-green-600 font-semibold">nas melhores bandeiras</p>
                    </div>
                </div>
            </header>
            <article className="flex justify-center items-center py-4">
                <div className="w-1/12 mx-1">
                    <img src={`${import.meta.env.VITE_ASSETS_URL}/amex.svg`} alt="..." />
                </div>
                <div className="w-1/12 mx-1">
                    <img src={`${import.meta.env.VITE_ASSETS_URL}/boleto.svg`} alt="..." />
                </div>
                <div className="w-1/12 mx-1">
                    <img src={`${import.meta.env.VITE_ASSETS_URL}/master.svg`} alt="..." />
                </div>
                <div className="w-1/12 mx-1">
                    <img src={`${import.meta.env.VITE_ASSETS_URL}/visa.svg`} alt="..." />
                </div>
                <div className="w-1/12 mx-1">
                    <img src={`${import.meta.env.VITE_ASSETS_URL}/elo.svg`} alt="..." />
                </div>

                <div className="w-1/12 mx-1">
                    <Pix size={20} color="#0086ff" />
                </div>
            </article>
        </div>
    )
}