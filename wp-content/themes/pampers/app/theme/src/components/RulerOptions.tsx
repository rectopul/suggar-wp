import { useInfos } from "../provider/InfosProvider"

export default function RulerOptions() {
    const { infos } = useInfos()

    return (
        <div className="w-full my-10">
            <div className="lg:max-w-[1400px] mx-auto w-full flex flex-col md:flex-row md:justify-between">
                <div className="w-full md:w-1/4 p-3 flex justify-center md:justify-start">
                    <figure className="py-2">
                        <img 
                            src={`${import.meta.env.VITE_ASSETS_URL}/cart-2-ico.svg`}
                            alt="card-ico"
                            width={30}
                            height={30}
                        />
                    </figure>
                    <div className="ml-4">
                        <h3 className="text-lime-green font-bold">Compra Segura</h3>
                        <p className="text-xs text-heading whitespace-pre-wrap">{infos?.ruler_options.ruler_options_1}</p>
                    </div>
                </div>
                <div className="w-full md:w-1/4 p-6 flex justify-center md:justify-start">
                    <figure className="py-2">
                        <img 
                            src={`${import.meta.env.VITE_ASSETS_URL}/truck-ico.svg`}
                            alt="card-ico"
                            width={30}
                            height={30}
                        />
                    </figure>
                    <div className="ml-4 m-w-10">
                        <h3 className="text-lime-green font-bold">Frete Grátis</h3>
                        <p className="text-xs text-heading whitespace-pre-wrap">{infos?.ruler_options.ruler_options_2}</p>
                    </div>
                </div>
                <div className="w-full md:w-1/4 p-3 flex justify-center md:justify-start">
                    <figure className="py-2">
                        <img 
                            src={`${import.meta.env.VITE_ASSETS_URL}/label-ico.svg`}
                            alt="card-ico"
                            width={27}
                            height={18}
                        />
                    </figure>
                    <div className="ml-4">
                        <h3 className="text-lime-green font-bold">Suporte Profissional</h3>
                        <p className="text-xs text-heading whitespace-pre-wrap">{infos?.ruler_options.ruler_options_3}</p>
                    </div>
                </div>
                <div className="w-full md:w-1/4 p-3 flex justify-center md:justify-start">
                    <figure className="py-2">
                        <img 
                            src={`${import.meta.env.VITE_ASSETS_URL}/card-ico.svg`}
                            alt="card-ico"
                            width={30}
                            height={30}
                        />
                    </figure>
                    <div className="ml-4">
                        <h3 className="text-lime-green font-bold">Satisfação ou Reembolso</h3>
                        <p className="text-xs text-heading whitespace-pre-wrap">{infos?.ruler_options.ruler_options_4}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}