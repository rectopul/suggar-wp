import { ImageProps } from "../../util/types"
import Zoom from 'react-medium-image-zoom'

interface ProductImageProps {
    image:ImageProps
}

export function ProductImage({ image }:ProductImageProps) {
    return (
        <Zoom>
            <picture className="w-3/12 md:w-full">
                <source media="(max-width: 800px)" srcSet={image.src} />
                <img src={image.src} alt="..." width={600} />
            </picture>
        </Zoom>
    )
}