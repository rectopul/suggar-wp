import { ArrowDown } from "lucide-react";
import { ProductPros } from "../util/types";
import { Price } from "./Price/Price";
import { parcelOptions, percentProduct } from "../util/Price";
import { AddToCart } from "../assets/Icons";
import { addItemToCart, getProductInfo, retrieveProductVariation } from "../util/Api";
import { useInfos } from "../provider/InfosProvider";
import { useState } from "react";
import { ProductVariations } from "../@types/ProductVariations";
import { SelectVariation } from "./SelectVariation";

interface ProductViewPros {
    data: ProductPros
}

interface AddToCartTypes {
    id: number
    quantity: number
}

export function ProductView({ data }: ProductViewPros) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [variationsList, setVariationsList] = useState<ProductVariations[] | null>(null)
    const { updateCart, changeCart } = useInfos()

    const checkProduct = async (id: number) => {
        try {
            setIsLoading(true)
            const productInfo = await getProductInfo(id)

            const { variations } = productInfo

            if(variations.length) {
                const allVariationsOnProduct: ProductVariations[] = []

                await Promise.all(
                     variations.map(async (v) => {
                        try {
                            const productWithVariation: ProductVariations = await retrieveProductVariation({product: data.id, variation: v})
                            allVariationsOnProduct.push(productWithVariation) 
                        } catch (error) {
                            console.log(`Erro ao buscar variação`, v)
                        }
                    })
                )

                setVariationsList(allVariationsOnProduct)

                setIsLoading(false)
            }else{
                handleAddToCart({id, quantity: 1})
            }
            console.log(`informações do produto`, productInfo)
        } catch (error) {
            console.log(`Erro ao buscar informações do produto`)
        }
    }

    const handleAddToCart = async (params: AddToCartTypes) => {
        try {
            setIsLoading(true)
            const addToCart = await addItemToCart({data: params})

            addToCart && updateCart(addToCart)
            addToCart && changeCart(true)
            addToCart && setIsLoading(false)
        } catch (error) {
            console.log(`erro ao adicionar produto ao carrinho`, error)
        }
    }

    return (
        <div className="w-6/12 md:w-1/3 p-2 group/view relative">
            {variationsList && <SelectVariation variations={variationsList} onSelectVariation={() => setVariationsList(null)} />}
            <div 
                onClick={() => checkProduct(data.id)}
                className="z-10 cursor-pointer hover:bg-white hover:shadow hover:text-green-500 absolute top-[50%] right-5 translate-y-[-50%] group-hover/view:flex hidden w-[60px] h-10 border border-green-500 rounded bg-white text-white font-semibold items-center justify-center"
            >
                {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <AddToCart size={24} color="#22c55e" />
                )}
                
            </div>
            <a href={data.permalink}>
                <div className="w-full h-full shadow bg-white flex flex-col md:flex-row rounded-xl p-4 transition-transform transform hover:-translate-y-3 duration-500 ease-in-out">
                    

                    <figure className="w-full md:w-[105px] relative px-4">
                        <span className="flex text-xs bg-green-500 text-white justify-center items-center absolute top-[-5px] left-[-5px] rounded-xl py-1 px-2">
                            <ArrowDown strokeWidth={2} size={12} />{percentProduct(data.regular_price, data.sale_price)}%
                        </span>
                        
                        <img src={data.images[0].src} alt={data.images[0].alt} width={104} />
                    </figure>
                    <div className="flex-1 flex flex-col ml-5 text-heading">
                        <a href={data.permalink}><h2 className="text-sm mb-2">{data.name}</h2></a>

                        <div className="w-full">
                            <span className=" text-green-600 flex flex-col text-lg font-medium">
                                <div 
                                    className="flex flex-col md:flex-row justify-start items-start md:items-center"
                                >
                                    <Price props={data} />
                                </div>

                                {data.price && (
                                    <p className="text-heading text-sm">
                                        em até <b>12X</b> de <span className="text-green-600 font-semibold">{parcelOptions(data.price)}</span>
                                    </p>
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}