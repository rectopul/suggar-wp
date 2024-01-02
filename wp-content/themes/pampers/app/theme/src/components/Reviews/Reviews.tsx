import { StartRating } from "../../assets/Icons"
import { ProductPros } from "../../util/types"
import { ReviewsList } from "./List"

interface ProductReviewProps {
    product: ProductPros
}

export function Reviews({ product }:ProductReviewProps) {
    return (
        <div className="flex flex-col px-2 md:px-0">
            <header className="py-3">
                <h2 className="text-2xl">Reviews</h2>
            </header>

            <article className="border-t py-6 flex w-full">
                <div className="w-6/12 md:w-2/12 flex flex-col">
                    <span className="text-yellow-400 text-5xl font-bold font-pop flex items-center">
                        {5.5} <b className="text-base text-brown ml-2">/ 5</b>
                    </span>
                </div>

                <div className="w-6/12 md:w-3/12 border-dotted border-l border-gray-400 px-8 py-3 flex flex-col">
                    <span className="flex items-center text-base mb-1">
                        5 
                        <StartRating size={16} className="ml-2" />
                        <span className="w-7/12 bg-gray-300 py-[6px] px-2 mx-2 relative">
                            <span className="absolute w-[80%] h-full left-0 top-0 bg-yellow-400"></span>
                        </span>

                        <span className="px-4 py-[1px] border border-gray-300 text-sm font-medium text-center rounded-2xl">{
                            Math.floor(Math.random() * (402 - 200 + 1) + 200)
                        }</span>
                    </span>
                    <span className="flex items-center text-base mb-1">
                        4 
                        <StartRating size={16} className="ml-2" />
                        <span className="w-7/12 bg-gray-300 py-[6px] px-2 mx-2 relative">
                            <span className="absolute w-[20%] h-full left-0 top-0 bg-yellow-400"></span>
                        </span>
                        <span className="px-4 py-[1px] border border-gray-300 text-sm font-medium text-center rounded-2xl">{
                            Math.floor(Math.random() * (60 - 45 + 1) + 45)
                        }</span>
                    </span>
                    <span className="flex items-center text-base mb-1">
                        3 
                        <StartRating size={16} className="ml-2 mb-1" />
                        <span className="w-7/12 bg-gray-300 py-[6px] px-2 mx-2 relative">
                            <span className="absolute w-[5%] h-full left-0 top-0 bg-yellow-400"></span>
                        </span>
                        <span className="px-4 py-[1px] border border-gray-300 text-sm font-medium text-center rounded-2xl">{
                            Math.floor(Math.random() * (11 - 3 + 1) + 3)
                        }</span>
                    </span>
                    <span className="flex items-center text-base mb-1">
                        2 
                        <StartRating size={16} className="ml-2" />
                        <span className="w-7/12 bg-gray-300 py-[6px] px-2 mx-2 relative">
                            <span className="absolute w-[3%] h-full left-0 top-0 bg-yellow-400"></span>
                        </span>
                        <span className="px-4 py-[1px] border border-gray-300 text-sm font-medium text-center rounded-2xl">{
                            Math.floor(Math.random() * (5 - 1 + 1) + 5)
                        }</span>
                    </span>
                    <span className="flex items-center text-base">
                        1 
                        <StartRating size={16} className="ml-2" />
                        <span className="w-7/12 bg-gray-300 py-[6px] px-2 mx-2"></span>
                        <span className="px-4 py-[1px] border border-gray-300 text-sm font-medium text-center rounded-2xl">{
                            Math.floor(Math.random() * (2 - 1 + 1) + 1)
                        }</span>
                    </span>
                </div>
            </article>
            <div className="mt-4 w-full border-t border-gray-200 py-10">
                <ReviewsList product_id={product.id} />
            </div>
        </div>
    )
}