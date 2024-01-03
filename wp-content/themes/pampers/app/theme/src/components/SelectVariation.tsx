import { ProductVariations } from "../@types/ProductVariations"
import { useInfos } from "../provider/InfosProvider"
import { addItemToCart } from "../util/Api"

interface SelectVariationsProps {
    variations: ProductVariations[]
    onSelectVariation: () => void
}

export function SelectVariation({ variations, onSelectVariation }: SelectVariationsProps) {
    const { updateCart, changeCart } = useInfos()

    const handleAddToCart = async (id: number, attribute: string, value: string) => {
        try {
            const data = {
                id,
                quantity: 1,
                variation: [
                    {
                        attribute,
                        value
                    }
                ]
            }
            const variationToCart = await addItemToCart({data})
            variationToCart && updateCart(variationToCart)
            variationToCart && changeCart(true)

            onSelectVariation()
        } catch (error) {
            console.log(`Erro ao adicionar variação ao carrinho`, error)
        }
    }

    return (
        <div className="absolute z-20 top-[-50px] bg-white right-0 max-w-[250px] p-2 flex flex-wrap shadow rounded-sm">
            <span className="w-full text-base text-green-500 font-semibold mb-2 pb-2 border-b border-green-500">Selecione uma variação</span>

            <div className="flex w-full flex-wrap">
                {variations.map((v,k) => (
                    <div 
                        onClick={() => handleAddToCart(v.id, v.attributes[0].name, v.attributes[0].option)}
                        key={k} 
                        className="p-2 z-20 cursor-pointer hover:bg-green-500 hover:text-white border border-green-500 mr-1 mb-1 rounded text-green-500 font-semibold text-xs text-center leading-5"
                    >
                        {v.attributes[0].option}
                    </div>
                ))}
            </div>
        </div>
    )
}