import { SiteInfoMain } from "../@types/Infos";
import { getShopInfos, getSiteMedia, siteConfig } from "../util/Api";
import { MediaTypes, MenuItemsTypes, ShopTypes } from "../util/types";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
//VITE_ID_PRODUCT_TEST
interface ContextData {
    infos: SiteInfoMain | null
    shop: ShopTypes | null
    media: MediaTypes | null
    items_menus: MenuItemsTypes | null
}

const defaultContextData: ContextData = {
    infos: null,
    shop: null,
    media: null,
    items_menus: null,
};

const context = createContext<ContextData>(defaultContextData);

type InfosProviderProps = {
    children: ReactNode;
};

export default function InfosProvider({ children }: InfosProviderProps) {
    const [infos, setInfos] = useState<SiteInfoMain | null>(null); // Defina o tipo como ShopInfoTypes | null
    const [shop, setShop] = useState<ShopTypes | null>(null); // Defina o tipo como ShopInfoTypes | null
    const [media, setMedia] = useState<MediaTypes | null>(null); // Defina o tipo como ShopInfoTypes | null

    const getInfos = async () => {
        try {
            const shopInfos = await getShopInfos();
            const infosShop = await siteConfig()
            const mediaInd = await getSiteMedia(infosShop.site_logo)

            setShop(infosShop)
            setMedia(mediaInd)
            setInfos(shopInfos);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getInfos();
    }, []);

    const dataContext: ContextData = {
        infos,
        shop,
        media,
        items_menus: null,
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
