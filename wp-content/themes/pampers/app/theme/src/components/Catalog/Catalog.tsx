import { useState,  useEffect } from "react";
import { getAllCatalog, getAllProductsCategory } from "../../util/Api";
import { formatPrice } from "../../util/Price";

interface ImagesCategory {
    name: string
    src: string
}

interface CatalogProductProps {
    id: number
    images: ImagesCategory[]
    name: string
    permalink: string
    price: string
}

export function Catalog() {
    const [categories, setCategories] = useState<CatalogProductProps[] | null>()

    const categoryId = window.categoryProps

    const getCategories = async () => {
        try {
            let listProducts;
            if(!categoryId) {
                listProducts = await getAllCatalog()
            }else{
                listProducts = await getAllProductsCategory(categoryId?.id)
            }

            setCategories(listProducts)

            console.log(`produtos listados: `, listProducts)
        } catch (error) {
            console.log(`erro ao pegar categorias`)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])
    return (
        <div className="w-full">
            <div className="w-full md:w-[1400px] px-2 md:px-0 mx-auto flex flex-col">
                <h3 className="font-bold text-lg md:text-3xl text-lime-green mt-4">{categoryId ? categoryId.title : 'Catalogo'}</h3>

                <div className="w-full px-2 md:px-0 py-4 flex flex-wrap">
                    {categories && categories.map((c, k) => (
                        <div className="w-6/12 md:w-2/12 flex" key={k}>
                            <div className="flex shadow mx-1 my-3 flex-col rounded-md">
                                <figure className="w-full p-3">
                                    <img src={c.images[0].src} className="rounded-lg" alt="..." />
                                </figure>

                                <div className="w-full mt-auto py-4 flex flex-col px-2">
                                    <a href={c.permalink} className="w-full flex flex-col">
                                        <h3 className="h-[100px] w-full">{c.name}</h3>
                                        <span className="text-lime-green font-semibold text-xl">{formatPrice(c.price)}</span>
                                    </a>

                                    <a href={c.permalink} className="px-3 py-2 text-white text-center rounded-lg bg-lime-green my-2">Comprar</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}