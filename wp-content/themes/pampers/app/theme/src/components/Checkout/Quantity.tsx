import { useState } from "react"

interface QuantityProps {
    quantity: number
}

export function Quantity({ quantity }: QuantityProps) {
    const [qtd, setQtd] = useState<number>(quantity)

    const quantityMinus = () => {
        setQtd(val => (val > 1 ? val - 1 : val))
    }

    const quantityPlus = () => setQtd(val => val + 1)

    return (
        <div className="flex justify-between bg-gray-100 p-2 border border-gray-300 rounded-md">
            <button className="w-10 h-7 hover:bg-lime-green hover:text-white leading-3 rounded-sm flex items-center justify-center shadow bg-gray-50 font-bold text-xl"
                onClick={quantityMinus}
            >-</button>
            <input className="bg-transparent outline-none w-10 h-7 text-center" type="text" value={qtd} />
            <button className="w-10 h-7 flex hover:bg-lime-green hover:text-white leading-3 rounded-sm items-center justify-center shadow bg-gray-50 font-bold text-xl"
                onClick={quantityPlus}
            >+</button>
        </div>
    )
}