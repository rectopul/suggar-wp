import { Trash } from "lucide-react"
import { formatPrice } from "../../util/Price"
import { ItemCartPTypes } from "../../util/types"
import { RemoveItemCart } from "../../util/Api"
import { useInfos } from "../../provider/InfosProvider"
import { MiniQuantity } from "./Quantity"

interface ItemProps {
    item: ItemCartPTypes
}


export function MiniCartItem({ item }: ItemProps) {
    const { updateCart } = useInfos()

    const price = parseFloat(item.prices.regular_price)
    const sale_price = parseFloat(item.prices.sale_price)

    const fomatted_price = price / 100
    const fomatted_sale_price = sale_price / 100

    const string_price = fomatted_price.toString()
    const string_sale_price = fomatted_sale_price.toString()

    const handleRemoveItem = async () => {
        try {
            const response = await RemoveItemCart(item.key)
            updateCart(response)
        } catch (error) {
            console.log(`Erro ao remover produto ${item.name}`)
        }
    }

    return (
        <div className="w-full p-2 bg-white rounded-xl shadow flex mb-2">
            <div className="flex">
                <figure className="w-4/12">
                    <img src={item.images[0].src} alt="..." />
                </figure>
                <div className="w-8/12 flex flex-col ml-2">
                    <h4 className="text-xs mb-1" dangerouslySetInnerHTML={{__html: item.name}}></h4>
                    {item.variation && item.variation.length > 0 && (
                        <small className="text-[11px] text-gray-300 font-medium" dangerouslySetInnerHTML={{__html: `${item.variation[0].attribute} : ${item.variation[0].value}`}}></small>
                    )}

                    <small className="my-1 flex">
                        <span className="flex w-3/7 flex-col">
                            <span className="line-through text-gray-400 text-xs font-medium">{formatPrice(string_price)}</span>
                            <span className="text-green-500 font-bold text-base">{formatPrice(string_sale_price)}</span>
                        </span>
                        <MiniQuantity item={item} />
                    </small>
                </div>
            </div>
            
            <div className="w-1/12 ml-2 text-end text-xs flex text-red-200 flex-col justify-start">
                <button 
                    className="w-1/4 rounded-lg text-red-500 hover:text-red-400 mt-2"
                    onClick={handleRemoveItem}
                >
                    <Trash size={15} />
                </button>
            </div>
        </div>
    )
}