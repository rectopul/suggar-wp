export default function HomePromo() {
    return (
        <div className="w-full px-2 md:px-0">
            <div className="w-full md:max-w-[1400px] mx-auto my-10 bg-gradient-to-r from-lime-green to-emerald-300 px-8 py-8 rounded-3xl text-white">
                <h2 className="text-2xl font-medium mb-2">Fraldas em PROMO</h2>
                <p>Veja mais produtos relacionados <br />
                clicando no botão
                </p>

                <a 
                    href="" 
                    className="bg-white py-3 px-6 text-center inline-block mt-4 rounded-lg text-lime-green font-semibold
                    transition-transform transform hover:-translate-y-2 duration-500 ease-in-out
                    "
                >Ver mais produtos</a>
            </div>
        </div>
    )
}