import { formatPrice } from "../../util/Price"
import { ProductPros, ProductWithVariationsPros } from "../../util/types"
import { Pix } from "../../assets/Icons"

interface ProductPriceProp {
    product: ProductWithVariationsPros | ProductPros
}

function parcelOptions(value: string) {
    const nvalue = parseInt(value)
    return formatPrice((nvalue / 12).toString())
}

function ValueDiscount(value1: string, value2: string) {
    const v1 = parseFloat(value1)
    const v2 = parseFloat(value2)

    return (v1 - v2).toString()
}

export function ProductPrice({ product }: ProductPriceProp) {
    return (
        <div className="flex flex-col">
            {product.sale_price ? (
                <>
                    <span className="text-gray-400 uppercase">
                        De 
                        <span className="line-through ml-1">{formatPrice(product.regular_price)}</span>
                    </span>
                    <span className="text-green-400 font-semibold text-2xl">{formatPrice(product.sale_price)}</span>

                    <span>
                        Em até 12x de <b>{parcelOptions(product.sale_price)}</b>
                    </span>
                    <span className="bg-red-500 text-white w-[max-content] text-sm py-1 px-2 rounded">{formatPrice(ValueDiscount(product.regular_price, product.sale_price))} de desconto</span>
                    <span className=" border w-[max-content] my-2 text-xs text-blue-500 border-blue-500 text-center flex items-center px-4 py-1 rounded-2xl">
                        <Pix size={20} color="#0086ff" className="mr-2" /> Até <b className="mx-1">15% OFF</b> no PIX
                    </span>
                </>
            ): (
                <>
                    <span className="text-green-400 font-semibold text-2xl">{formatPrice(product.price)}</span>

                    <span>
                        Em até 12x de <b>{parcelOptions(product.price)}</b>
                    </span>
                    <span className=" border w-[max-content] my-2 text-xs text-blue-500 border-blue-500 text-center flex items-center px-4 py-1 rounded-2xl">
                        <Pix size={20} color="#0086ff" className="mr-2" /> Até <b className="mx-1">3% OFF</b> no PIX
                    </span>
                </>
            )}
        </div>
    )
}