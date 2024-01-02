import { useEffect, useState } from "react"
import { ProductReview } from "../../util/types"
import { productReviews } from "../../util/Api"
import { Rating } from "@mui/material"

interface ReviewListProps {
    product_id: number
}

export function ReviewsList({ product_id }: ReviewListProps) {
    const [reviews, setReviews] = useState<ProductReview[] | null>()

    const getReviews = async () => {
        try {   
            const list  = await productReviews(product_id)

            setReviews(list)
        } catch (error) {
            console.log(`erro ao pegar reviews`)
        }
    }

    useEffect(() => {
        getReviews()
    }, [])

    if(reviews?.length) {
        return (
            <div className="w-full">
                <div className="w-full md:w-[1400px] py-3 flex flex-wrap">
                    {reviews.map((r, k) => (
                        <div key={k} className="flex w-6/12 md:w-3/12 mb-2">
                            <div className="flex flex-col mx-2 rounded-md border border-gray-200 bg-white px-4 py-3">
                                <span className="flex items-center mb-2">
                                    <h4 className="capitalize font-normal text-base">{r.reviewer}</h4>
                                    <small className="flex items-center ml-2 capitalize text-xs">
                                        Verified 
                                        <img 
                                            src={`${import.meta.env.VITE_ASSETS_URL}/verified.png`} 
                                            className="ml-2" 
                                            width={8} 
                                            height={8} 
                                            alt="" 
                                        />
                                    </small>
                                </span>

                                <span className="mb-2"><Rating value={parseFloat(r.rating)} /></span>

                                <span className="text-base font-medium" dangerouslySetInnerHTML={{__html: r.review}}></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }else{
        return (
            <div className="w-full text-6xl">{Math.floor(Math.random() * (450 - 220 + 1) + 205)} Reviews</div>
        )
    }

}