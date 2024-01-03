import { getSiteMedia, setNonceToLocalStorage, siteConfig } from "../util/Api"
import { MediaTypes, ShopTypes } from "../util/types"
import { Search, ShoppingBag } from "lucide-react"
import { useEffect, useState } from "react"
import SubHeader from "./SubHeader"
import { MiniCart } from "./MiniCart/MiniCart"
import { useInfos } from "../provider/InfosProvider"

interface headerProps {
    cartToogle?: boolean
    handleCartClose?: (data: boolean) => void
}

export function Header( { cartToogle, handleCartClose }: headerProps ) {
    const [, setSite] = useState<ShopTypes>()
    const [logo, setLogo] = useState<MediaTypes>()
    const { cart } = useInfos()
    const [clickBag, setClickBag] = useState<boolean>(false)

    useEffect(() => {
        console.log(`mudança no cart`)
        cartToogle && setClickBag(true)
    }, [cartToogle])

    const getInfo = async () => {
        try {
            //const menus = await getMenus()
            await setNonceToLocalStorage()
            const result = await siteConfig()
            const media = await getSiteMedia(result.site_logo)

            setLogo(media)
            setSite(result)
        } catch (error) {
            console.log(error)
        }
    }

    const handleOpenCart = () => {
        setClickBag(true)
        console.log(`abrir carrinho`, clickBag)
    }

    const handleCloseCart = () => {
        setClickBag(false)
        handleCartClose && handleCartClose(false)
        console.log(`estado do carrinho: `, clickBag)
    }

    useEffect(() => {
        getInfo()
    }, [])

    return (
        <>
            <MiniCart tootle={clickBag} onCloseCart={handleCloseCart} />
            <div className="shadow-footer text-center">
                <header className="w-full bg-lime-green py-12">
                    <nav className="w-full lg:max-w-[1024px] xl:max-w-[1400px] px-2 xl:px-0 bg-lime-green flex xl:flex-row flex-col items-center mx-auto justify-between">
                        <figure className="w-36 text-center">
                            <a href="/">
                                {logo && (
                                    <img 
                                        src={`${logo.media_details.sizes.medium.source_url}`} 
                                        alt={logo.media_details.sizes.medium.file}
                                    />
                                )}
                            </a>
                        </figure>

                        <div className="w-full xl:w-[1040px] bg-white rounded mx-3 h-10 flex text-lime-green justify-center px-2">
                            <input type="text" name="search" className="w-full outline-none px-2" placeholder="O que está procurando?" />
                            <button className="w-10 border-l pl-2 flex content-center items-center">
                                <Search size={20} strokeWidth={2} />
                            </button>
                        </div>

                        <ul className="flex items-center text-white mt-10 xl:mt-0">
                            <li className="px-2">
                                <button className="relative flex">
                                    <i onClick={handleOpenCart} className="absolute w-7 h-7 cursor-pointer text-center bg-lime-green duration-300 p-2 z-10 shadow ease-in hover:scale-110 rounded-full border-lime-green top-[-20px] text-xs left-[15px] font-normal not-italic">{cart?.items_count}</i>
                                    <ShoppingBag className="mr-2" />
                                    <b>Carrinho</b>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </header>
                <SubHeader />
            </div>
        </>
    )
}