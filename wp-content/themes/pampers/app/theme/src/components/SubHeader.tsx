import { getCategories, getCity } from "../util/Api";
import { CategoryType, LocationProps } from "../util/types";
import {  Menu } from "lucide-react";
import { useEffect, useState } from "react";

export default function SubHeader() {
    const [city, setCity] = useState<LocationProps>()
    const [categories, setCategories] = useState<CategoryType[]>()

    const getInformations = async () => {
        const city = await getCity()
        const categoriesList = await getCategories()
        setCategories(categoriesList)
        setCity(city)
    }

    useEffect(() => {
        getInformations()
    },[])

    return (
        <div className="w-full flex content-center items-center py-4">
            <div className="w-full md:w-[1400px] mx-auto flex justify-between px-2 md:px-0">
                <span className="flex content-center items-center text-gray-700 font-normal text-xs">
                    <img 
                        src={`${import.meta.env.VITE_ASSETS_URL}/map-pin.svg`}
                        alt="Map pin"
                        className="mr-2"
                        width={18}
                        height={18}
                    />
                    {city && (
                        <>
                            <b className="!text-lime-green mr-1">Frete Grátis</b> 
                            para 
                            <b className="text-lime-green mx-1">{city?.city}</b> 
                        </>
                    )}
                    e região
                </span>
                <ul className="hidden md:flex content-center items-center">
                    <li>
                        <Menu />
                    </li>
                    {categories?.length && categories.map((i, k) => (
                        <li className={k != categories.length ? `mx-2 text-gray-700 uppercase text-xs font-semibold hover:text-lime-green`: `hover:text-lime-green uppercase text-gray-700`} key={k}>
                            <a href={`/categoria-produto/${i.slug}/`}>{i.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}