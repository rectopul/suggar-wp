import { useInfos } from "../../provider/InfosProvider";
import { formatPrice } from "../../util/Price";
import { Quantity } from "./Quantity";

export function Resume() {
    const { cart } = useInfos()
    const renderHTML = (html: string) => ({ __html: html });
    return (
        <div className="flex flex-col my-3 w-full md:w-2/5">
            <div className="w-full mt-5 md:mt-0 md:ml-6 bg-gray-100 shadow rounded-lg py-4 px-8 flex-col">
                <h3 className="text-lime-green font-bold text-xl mb-10">Resumo do Pedido</h3>

                <div className="w-full flex flex-col">
                    {cart && cart.items.map((i, k) => (
                        <div className="my-2 flex" key={k}>
                            <figure className="w-1/6">
                                <img src={i.images[0].thumbnail} className="rounded-md" />
                            </figure>

                            <div className="flex flex-col w-4/6">
                                <div className="flex flex-col ml-3">
                                    <h4 className="font-medium text-sm" dangerouslySetInnerHTML={renderHTML(i.name)}></h4>

                                    {Boolean(i.variation?.length) && (
                                        <small className="text-xs" dangerouslySetInnerHTML={renderHTML(i.variation[0].value)}></small>
                                    )}

                                    <div className="flex justify-between items-center">
                                        <span className="p-2">
                                            <Quantity quantity={i.quantity} />
                                        </span>
                                        <span className="font-bold text-green-500 text-lg">
                                            {formatPrice((parseFloat(i.prices.price) / 100).toString())}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex w-full border-t border-gray-300 pt-4 mt-4">
                    <div className="flex-col w-6/12">
                        <div className="full mb-3">{cart?.items.length} Produtos</div>
                        <div className="full">Frete</div>
                    </div>

                    <div className="flex flex-col w-6/12 text-right">
                        <div className="w-full mb-3">{cart && formatPrice((parseFloat(cart?.totals.total_price) /100).toString())}</div>
                        <div className="w-full">Grátis</div>
                    </div>
                </div>

                <div className="border-t border-gray-500 py-4 mt-4 flex items-center">
                    <div className="flex justify-between w-full">
                        <span className="text-xl font-bold">Total</span>
                        <span className="text-lime-green font-bold">{cart && formatPrice((parseFloat(cart?.totals.total_price) /100).toString())}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}