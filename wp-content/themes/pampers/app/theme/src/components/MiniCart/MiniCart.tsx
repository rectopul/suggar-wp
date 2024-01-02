import { MiniCartItem } from "./Item"
import { useInfos } from "../../provider/InfosProvider"
import { X } from "lucide-react"
import { formatPrice } from "../../util/Price"

interface MinicartProps {
    tootle: boolean
    onCloseCart: (data: boolean) => void
}


export function MiniCart({ tootle, onCloseCart}: MinicartProps) {
    const { cart } = useInfos()

    if(cart) {
        return (
            <div 
                className={`
                    md:w-[370px] 
                    transition-all 
                    ${!tootle ? 'translate-x-full' : ''}
                    ease-out
                    duration-500
                    w-full 
                    bg-white 
                    p-4
                    md:p-7 
                    fixed 
                    rounded-bl-3xl 
                    rounded-tl-3xl  
                    top-0 
                    right-0 
                    z-20 
                    h-full 
                    ${tootle ? 'translate-x-0' : ''}
                    
                    `}>
                    {/* ${open ? `` : `hidden` } */}
                <div className="w-full flex flex-col h-full">
                    <header className="text-lime-green w-full text-xl flex justify-between">
                        <span>Carrinho <b>{cart.items_count}</b> Items</span>
                        <button 
                            className="text-lime-green font-semibold hover:text-green-500"
                            onClick={() => onCloseCart(false)}
                        ><X size={25} /></button>
                    </header>

                    <article className="flex px-1 flex-1 overflow-y-auto flex-col my-3 border-t border-gray-300 py-3" >
                        {cart.items.map((i, k) => <MiniCartItem item={i} key={k} />)}
                    </article>

                    <article className="flex w-full flex-col mt-auto pt-3 border-t border-gray-300">
                        <h3 className="text-lg font-bold text-accent">Resumo da compra: </h3>

                        <div className="flex flex-col mt-4">
                            <span className="flex justify-between"> 
                                <span className="font-semibold text-base">Total: </span>
                                <span className="font-semibold text-base">{formatPrice((parseFloat(cart.totals.total_price) / 100).toString())}</span>
                            </span>

                            <span className="flex justify-between mt-2"> 
                                <span className="font-semibold text-base">Frete: </span>
                                <span className="font-semibold text-base text-lime-green">Grátis</span>
                            </span>
                        </div>
                    </article>

                    <footer className="flex justify-between mt-auto">
                        <a href="/carrinho" className="bg-lime-green border border-lime-green hover:bg-white hover:text-lime-green text-center rounded-md w-5/12 p-2 text-white font-semibold text-xs whitespace-nowrap">Finalizar compra</a>

                        <a 
                            href="#" 
                            className="bg-lime-green border border-lime-green hover:bg-white hover:text-lime-green text-center rounded-md w-6/12 p-2 text-white font-semibold text-xs whitespace-nowrap"
                            onClick={() => onCloseCart(false)}
                        >Continuar comprando</a>
                    </footer>
                </div>
            </div>
        )
    }else{
        return (
            <div className={`md:w-[370px] px-2 md:px-0 w-full bg-white xl:p-7 sm:p-4 fixed xl:rounded-bl-3xl xl:rounded-tl-3xl top-0 right-0 z-20 h-full ${tootle == true ? `` : `hidden` }`}>
                <div className="w-full flex flex-col font-bold text-xl">Não há items no carrinho</div>
            </div>
        )
    }
}