import { formatPrice } from "../../util/Price"
import { ProductPros } from "../../util/types"

interface PriceProps {
    props: ProductPros
}

export function Price({ props }: PriceProps) {
    return (
        <>
            {props.sale_price ? (
                <>
                    <span className="font-semibold">{formatPrice(props.sale_price)}</span>
                    <span className="flex justify-center text-sm md:ml-2 font-medium line-through text-heading">{formatPrice(props.regular_price)}</span>
                </>
            ): (
                <>
                    <span className="font-semibold">{formatPrice(props.price)}</span>
                </>
            )}
        </>
    )
}