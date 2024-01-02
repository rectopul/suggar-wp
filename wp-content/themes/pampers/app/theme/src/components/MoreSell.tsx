import { listAllPaymentGateways, listProductsMoreSell } from "../util/Api"
import { parcelOptions, percentProduct } from "../util/Price"
import { ProductPros } from "../util/types"
import { ArrowDown, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Price } from "./Price/Price"

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
            <div className="w-full md:w-[1400px] mx-auto mt-10 flex flex-col">
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
                    {products?.length && products.map((i, k) => (
                        <div className="w-6/12 md:w-1/3 p-2" key={k}>
                            <a href={i.permalink}>
                                <div className="w-full h-full shadow bg-white flex flex-col md:flex-row rounded-xl p-4 transition-transform transform hover:-translate-y-3 duration-500 ease-in-out">
                                    

                                    <figure className="w-full md:w-[105px] relative px-4">
                                        <span className="flex text-xs bg-green-500 text-white justify-center items-center absolute top-[-5px] left-[-5px] rounded-xl py-1 px-2">
                                            <ArrowDown strokeWidth={2} size={12} />{percentProduct(i.regular_price, i.sale_price)}%
                                        </span>
                                        
                                        <img src={i.images[0].src} alt={i.images[0].alt} width={104} />
                                    </figure>
                                    <div className="flex-1 flex flex-col ml-5 text-heading">
                                        <a href={i.permalink}><h2 className="text-sm mb-2">{i.name}</h2></a>

                                        <div className="w-full">
                                            <span className=" text-green-600 flex flex-col text-lg font-medium">
                                                <div 
                                                    className="flex flex-col md:flex-row justify-start items-start md:items-center"
                                                >
                                                    <Price props={i} />
                                                </div>

                                                {i.price && (
                                                    <p className="text-heading text-sm">
                                                        em até <b>12X</b> de <span className="text-green-600 font-semibold">{parcelOptions(i.price)}</span>
                                                    </p>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}