import { getShopInfos } from "../util/Api"
import { useEffect, useState } from "react"

export default function FullBanner() {
    const [banner, setBanner] = useState<string>()

    const getBanner = async () => {
        const shopInfo = await getShopInfos()
        setBanner(shopInfo.full_banner)
    }

    useEffect(() => {getBanner()}, [])

    return (
        <div className="w-full text-center">
            <figure className="w-full md:max-w-[1400px] mx-auto my-10">
                {banner && (
                    <img src={banner} className="w-full rounded-2xl" alt="..." />
                )}
            </figure>
        </div>
    )
}