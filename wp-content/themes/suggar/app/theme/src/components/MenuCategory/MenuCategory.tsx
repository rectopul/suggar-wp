import { useCallback, useEffect, useState } from "react"
import { SiteInfoMain } from "../../@types/Infos"
import { getShopInfos } from "../../util/Api"

export function MenuCategory() {
    const [infos, setInfos] = useState<SiteInfoMain | null>(null)
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

    const getInfos = useCallback(async () => {
        try {
            const infos = await getShopInfos()

            infos && setInfos(infos)
        } catch (error) {
            console.log(`Erro ao pegar informações do site`, error)
        }
    }, [])

    useEffect(() => {
        getInfos()
    }, [getInfos])

    return (
        <ul className="flex items-center text-sm font-semibold font-pop uppercase">
            {infos && infos.menus && Object.entries(infos.menus).map(([, menuItems]) => (
                <>
                    {menuItems.map((m, k) => (
                        <li className={`px-5 py-2 ${k === menuItems.length -1 && `bg-blue-900 text-white`}`} key={k}>
                            <a 
                                className={`p-2 relative ${k === menuItems.length -1 ? `text-white` : `text-neutral-700`}`} 
                                href={m.url}
                                onMouseEnter={() => setHoveredItem(k)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                {m.title}
                                {hoveredItem === k && <span className="w-full h-[1px] absolute bg-neutral-700 bottom-0 left-0"></span>}
                            </a>
                            <span></span>
                        </li>
                    ))}
                </>
            ))}
        </ul>
    )
}