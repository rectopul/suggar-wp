import { getCart, getShopInfos, getSiteMedia, siteConfig } from "../util/Api";
import { CartTypes, MediaTypes, MenuItemsTypes, ShopInfoTypes, ShopTypes } from "../util/types";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
//VITE_ID_PRODUCT_TEST
interface ContextData {
    infos: ShopInfoTypes | null
    shop: ShopTypes | null
    media: MediaTypes | null
    items_menus: MenuItemsTypes | null
    cart: CartTypes | null,
    updateCart: (data: CartTypes) => void
}

const defaultContextData: ContextData = {
    infos: null,
    shop: null,
    media: null,
    items_menus: null,
    cart: null,
    updateCart: () => {}
};

const context = createContext<ContextData>(defaultContextData);

type InfosProviderProps = {
    children: ReactNode;
};

export default function InfosProvider({ children }: InfosProviderProps) {
    const [infos, setInfos] = useState<ShopInfoTypes | null>(null); // Defina o tipo como ShopInfoTypes | null
    const [shop, setShop] = useState<ShopTypes | null>(null); // Defina o tipo como ShopInfoTypes | null
    const [media, setMedia] = useState<MediaTypes | null>(null); // Defina o tipo como ShopInfoTypes | null
    const [cart, setCart] = useState<CartTypes | null>(null)

    const getInfos = async () => {
        try {
            const shopInfos = await getShopInfos();
            const infosShop = await siteConfig()
            const mediaInd = await getSiteMedia(infosShop.site_logo)
            const myCart = await getCart()

            setCart(myCart)
            setShop(infosShop)
            setMedia(mediaInd)
            setInfos(shopInfos);
        } catch (error) {
            console.log(error);
        }
    };

    const updateCart = (newCart: CartTypes) => {
        setCart(newCart);
    };

    useEffect(() => {
        getInfos();
    }, []);

    const dataContext: ContextData = {
        infos,
        shop,
        media,
        items_menus: null,
        cart,
        updateCart
    }

    return (
        <context.Provider value={dataContext}>
            {children}
        </context.Provider>
    );
}

export function useInfos() {
    return useContext(context);
}
