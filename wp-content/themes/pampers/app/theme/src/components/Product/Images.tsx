import { ImageProps } from "../../util/types"

interface ThumbProps {
    image: ImageProps
}

export function ProductThumbnails({ image }: ThumbProps) {
    return  (
        <figure className="mb-2 mx-2 md:mx-0 border border-lime-green rounded hover:border-2 cursor-pointer">
            <img className="rounded" src={image.src} alt="..." />
        </figure>
    )
}