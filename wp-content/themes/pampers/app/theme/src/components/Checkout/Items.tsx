import { formatPrice } from "../../util/Price"
import { ItemCartPTypes } from "../../util/types"

interface CheckoutItemsTypes {
    item: ItemCartPTypes
}


export function CheckoutItem({ item }: CheckoutItemsTypes) {
    return (
        <tr className="p-5">
            <td className="px-4 py-6 text-center">
                <div className="flex w-full max-w-[200px]">
                    <figure className="w-4/12">
                        <img src={item.images[0].src} alt={item.images[0].alt} className="rounded-lg" />
                    </figure>

                    <div className="w-8/12 text-xs text-left ml-3">
                        {item.name}
                        <p>
                            {item.description}
                        </p>
                        <p>
                            {item.variation[0].attribute} : {item.variation[0].value}
                        </p>
                    </div>
                </div>
                
            </td>

            <td className="px-4 text-center">
                <div className="flex flex-col max-w-[140px] mx-auto py-4">
                    <div className="w-full flex border border-lime-green rounded-lg overflow-hidden">
                        <button className="w-4/12 h-10 text-xl font-bold flex items-center justify-center hover:bg-lime-green hover:text-white rounded-l-lg">-</button>
                        <input className="outline-none text-center font-bold text-lime-green px-3 w-4/12 py-1" type="text" value={item.quantity} />
                        <button className="w-4/12 h-10 text-xl font-bold flex items-center justify-center hover:bg-lime-green hover:text-white rounded-r-lg">+</button>
                    </div>

                    <a href="#" className="text-gray-400 text-xs mt-1 hover:underline">Remover</a>
                </div>
            </td>

            <td className="px-4 text-center text-xs">
                Frete grátis para Marília - SP <br /> (Chegará em 4 dias)
            </td>

            <td className="text-center text-lime-green font-bold">
                {formatPrice((parseFloat(item.prices.price) /100).toString())}
            </td>
        </tr>
    )
}