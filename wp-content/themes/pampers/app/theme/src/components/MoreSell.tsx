import { listProductsMoreSell } from "../util/Api"
import { ProductPros } from "../util/types"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { ProductView } from "./ProductView"

export default function MoreSell() {
    const [products, setProducts] = useState<ProductPros[]>()

    const getProducts = async () => {
        const list = await listProductsMoreSell()
        setProducts(list)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className="w-full">
            <div className="w-full md:max-w-[1400px] mx-auto mt-10 flex flex-col">
                <header className="w-full flex justify-between overflow-hidden px-2 md:px-0">
                    <h3 className="font-normal text-xl text-heading relative mb-8">
                        Acessórios + vendidos
                        <span className="absolute bottom-[-10px] w-[180px] bg-accent left-0 h-1.5 rounded"></span>
                    </h3>

                    <a href="/loja" className="font-semibold text-accent mr-[-19px] flex items-center transition-transform transform hover:translate-x-[-30px] duration-500 ease-in-out">
                        Ver Todos <ArrowRight className="ml-2" size={16} />
                    </a>
                </header>

                <div className="w-full flex justify-between flex-wrap">
                    {products?.length && products.map((i, k) => (<ProductView data={i} key={k} />))}
                </div>
            </div>
        </div>
    )
}