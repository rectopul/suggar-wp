import { useEffect, useState } from "react"
import { ItemCartPTypes } from "../../util/types"
import { updateProductCart } from "../../util/Api"
import { useInfos } from "../../provider/InfosProvider"

interface ItemProps {
    item: ItemCartPTypes
}

export function MiniQuantity({ item }: ItemProps) {
    const [qtd, setQtd] = useState<number>(item.quantity)
    const { updateCart } = useInfos()

    useEffect(() => {
        setQtd(item.quantity)
    }, [item.quantity])

    const handleUpdateCart = async () => {
        const product = await updateProductCart({data: { key: item.key, quantity: qtd}})
        updateCart(product)
    }

    const quantityMinus = () => {
        setQtd(val => (val > 1 ? val - 1 : val))
        handleUpdateCart()
    }

    const quantityPlus = () => { 
        setQtd(val => val + 1)
        handleUpdateCart()
    }

    return (
        <div className="flex w-4/7 h-9 items-center translate-x-[10px] justify-between bg-gray-100 px-2 py-1 border border-gray-300 rounded-md">
            <button className="w-5 h-5 hover:bg-lime-green hover:text-white leading-3 rounded-sm flex items-center justify-center shadow bg-gray-50 font-bold text-xl"
                onClick={quantityMinus}
            >-</button>
            <input className="bg-transparent outline-none w-7 h-5 text-center" type="text" value={qtd} />
            <button className="w-5 h-5 flex hover:bg-lime-green hover:text-white leading-3 rounded-sm items-center justify-center shadow bg-gray-50 font-bold text-xl"
                onClick={quantityPlus}
            >+</button>
        </div>
    )
}