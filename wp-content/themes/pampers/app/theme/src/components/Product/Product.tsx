import { useEffect, useState } from "react"
import { AddItemToCartPayload, ImageProps, ProductPros, ProductWithVariationsPros } from "../../util/types"
import { addItemToCart, getProductInfo, getProductVariations } from "../../util/Api"
import { ProductThumbnails } from "./Images"
import { Rating } from "@mui/material"
import { useInfos } from "../../provider/InfosProvider"
import { ProductPrice } from "./Price"
import 'react-medium-image-zoom/dist/styles.css'
import { PaymentOptions } from "../PaymentOptions"
import { ProductImage } from "./ProductImage"
import { Reviews } from "../Reviews/Reviews"

const productId = window.product_Infos

interface ProductPageProps {
    onCartOpen: (data: boolean) => void
}


export function Product( { onCartOpen }: ProductPageProps ) {
    const [product, setProduct] = useState<ProductPros>()
    const [variations, setVariations] = useState<ProductWithVariationsPros[]>()
    const [activeVariation, setActiveVariation] = useState<ProductWithVariationsPros>()
    const [qtd, setQtd] = useState(1)
    const [mainImage, setMainImage] = useState<ImageProps | null>(null);
    const [productAdd, setProductAdd] = useState<AddItemToCartPayload | null>(null);
    const [isLoading, setIsloading] = useState<boolean>(false)

    const { shop, updateCart } = useInfos()

    const getProduct = async () => {
        try {
            if(!productId) return false
            const product = await getProductInfo(productId.id)
            const variations = await getProductVariations(`${product.id}`)

            setVariations(variations)
            setActiveVariation(variations[1])
            setProduct(product)
            setMainImage(product.images[0])
        } catch (error) {
            console.log(`Erro na requisição de produto`)
        }
    }

    const handleSetActiveVariation = (data: ProductWithVariationsPros) => {
        setActiveVariation(data)

        if(product) {

            let dynamicIndexName;

            for (const index in productId.variations) {
                const variation = productId.variations[index as keyof typeof productId.variations]
                const filtred = variation?.filter(item => item.name == data.attributes[0].option)

                if(filtred?.length) {
                    dynamicIndexName = {
                        attribute: index,
                        value: filtred[0].slug,
                        id: filtred[0].term_id
                    }
                    
                    break
                }

            }

            if(!dynamicIndexName) return false

            const add = {
                id: product.id,
                quantity: qtd,
                variation: [dynamicIndexName]
            }
            setProductAdd({data: {...add}})
        }
    }

    const handleAddItemToCart = async () => {
        try {
            setIsloading(true)
            let item;
            if(!productId.variations) {
                item = await addItemToCart({ data: { id: productId.id, quantity: qtd} })
            }else{

            }

            if(productAdd){
                item = await addItemToCart(productAdd)
            }

            item && updateCart(item)
            onCartOpen(true)
            setIsloading(false)
        } catch (error) {
            setIsloading(false)
            console.log(`Erro ao adicionar produto ao carrinho`, error)
        }
    }

    const handleClickImageCarousel = (image: ImageProps) => setMainImage(image)

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div className="w-full">
            {product && (
                <>
                    <div className="lg:w-[1400px] p-5 flex mx-auto flex-wrap md:flex-nowrap">
                        <div className="w-full md:w-3/5 flex flex-col">
                            <div className="flex w-full flex-wrap md:flex-nowrap">
                                <div className="w-7/12 mx-2 md:mx-0 md:w-2/12 px-7 flex items-start flex-row md:flex-col overflow-hidden">
                                {product && product.images.map((i, k) => (
                                        <div key={k} onClick={() => handleClickImageCarousel(i)}>
                                            <ProductThumbnails image={i} />
                                        </div>
                                    ))}
                                </div>
                                    
                                <div className="w-full md:w-10/12 flex md:flex-col">
                                    {mainImage && ( <ProductImage image={mainImage} /> )}
                                </div>
                            </div>
                            
                            <div className="mt-8 p-8 shadow rounded-xl bg-white text-center">
                                <h3 className="text-2xl">Descrição</h3>
                                <div 
                                    className="w-full mt-4 text-base text-center" 
                                    dangerouslySetInnerHTML={{__html: product.description}}
                                ></div>
                            </div>
                        </div>

                        <div className="w-full md:w-2/5 flex flex-col ml-8">
                            <div className="flex items-center">
                                <img src={`${import.meta.env.VITE_ASSETS_URL}/fire-ico.svg`} width={20} alt="" />
                                1465 unidades vendidas
                            </div>

                            <div className="flex items-center">
                                <span className="rounded-xl bg-red-600 text-white text-center px-4 py-1 mt-3 text-xs">Frete grátis</span>
                            </div>

                            <div className="text-2xl mt-4">{product.name}</div>
                            <small className="text-gray-400">(Cod. Item {product.id}) | <span className="text-blue-400">Disponível em estoque</span></small>

                            <div className="mt-4 flex items-center">
                                <Rating 
                                    name="product-ratting-count"
                                    value={5}
                                    disabled
                                />

                                ({Math.floor(Math.random() * (375 - 460 + 1) + 375)} Reviews)
                            </div>

                            <div className="bg-blue-200 w-inherit text-xs py-2 mt-2 text-indigo-500 rounded px-2">
                                Vendido e entregue por <b>{shop?.name}</b>
                            </div>

                            <hr className="my-4" />

                            <div className="flex flex-col mb-1">
                                <div>{activeVariation && (
                                    <>
                                        <span className="mr-2">{activeVariation.attributes[0].name}</span>
                                        {activeVariation.attributes[0].option}
                                    </>
                                )}</div>

                                <div className="flex flex-wrap">
                                    {variations && variations.map((a, k) => 
                                        a.attributes[0] && (

                                            <div key={k} onClick={() => handleSetActiveVariation(variations[k])} className="px-3 bg-accent-rgb py-2 hover:bg-indigo-200 cursor-pointer rounded-md border border-accent my-2 mr-1">{a.attributes[0].option}</div>
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <h4 className="text-xl font-semibold">Preço:</h4>
                                <div className="flex flex-col">
                                    {activeVariation && activeVariation.regular_price && activeVariation.sale_price ? (
                                        <ProductPrice product={activeVariation} />
                                    ) : (
                                        <ProductPrice product={product} />
                                    ) }
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                {isLoading ? (
                                    <button 
                                        className="w-6/12 uppercase border hover:border-lime-green hover:bg-white hover:text-lime-green rounded-lg p-3 bg-lime-green text-white font-semibold text-center"
                                        disabled
                                    >
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </button>

                                ) : (
                                    <button 
                                        className="w-6/12 uppercase border hover:border-lime-green hover:bg-white hover:text-lime-green rounded-lg p-3 bg-lime-green text-white font-semibold text-center"
                                        onClick={() => handleAddItemToCart()}
                                    >Comprar Agora</button>
                                )}

                                <div className="w-5/12 my-4 flex items-center border border-lime-green rounded p-2 font-semibold justify-center">
                                    <button 
                                        className="w-3/12 text-2xl hover:text-lime-green" 
                                        onClick={() => setQtd(previous => previous > 1 ? previous - 1 : 1)}
                                    >-</button>
                                    <input value={qtd} className="text-center w-4/12 bg-transparent outline-none" />
                                    <button 
                                        className="w-3/12 text-2xl hover:text-lime-green" 
                                        onClick={() => setQtd(previous => previous + 1)}
                                    >+</button>
                                </div>
                            </div>

                            <div className="flex">
                                <PaymentOptions />
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-[1400px] mx-auto">
                        <div className="w-5/5">
                            <Reviews product={product} />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}