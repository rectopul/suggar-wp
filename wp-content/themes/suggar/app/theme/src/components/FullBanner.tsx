import { getShopInfos } from "../util/Api"
import { useEffect, useState } from "react"

export default function FullBanner() {
    const [banner, setBanner] = useState<string>()

    const getBanner = async () => {
        const shopInfo = await getShopInfos()
        shopInfo && shopInfo.full_banner && setBanner(shopInfo.full_banner)
    }

    useEffect(() => {getBanner()}, [])

    return (
        <div className="w-full text-center mb-[20px] xl:mb-[60px]">
            <figure className="w-full mx-auto">
                {banner && (
                    <img src={banner} className="w-full" alt="..." />
                )}
            </figure>
        </div>
    )
}