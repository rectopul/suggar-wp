import oauthSignature from "oauth-signature"
import { WooPaymentGatewayList } from "../@types/Payment"
import { AddItemToCartPayload, CartTypes, CatalogProductProps, CategoryType, LocationProps, MediaTypes, OrderPayloadTypes, OrderReturnsType, ProductPros, ProductReview, ProductWithVariationsPros, ShippingTypes, ShopInfoTypes, ShopTypes, UpdateItemCartPayload } from "./types"
//import oauthSignature from 'oauth-signature'

interface NonceProps {
    nonce: string
    woo_nonce: string
}

const setNonceToLocalStorage = async () => {
    try {
        const nonce = await getNonce()

        localStorage.setItem('wp_nonce', nonce.nonce)
        localStorage.setItem('woo_nonce', nonce.woo_nonce)
    } catch (error) {
        throw error
    }
}


const getNonceToLocalStorage = (): NonceProps => {
    try {
        const woo_nonce = localStorage.getItem('woo_nonce') || '';
        const nonce = localStorage.getItem('wp_nonce');

        if (!nonce) throw Error(`Não existe nonce`);

        const result: NonceProps = { nonce, woo_nonce }

        return result;
    } catch (error) {
        throw Error(`Não existe nonce`);
    }
};

function OAuth(url: string, method: string): string {
    const parameters = {
        oauth_consumer_key : `${import.meta.env.VITE_LOCAL_COMSUMER_KEY}`,
        oauth_nonce : Math.random().toString(32).replace(/[^a-z]/, '').substr(2),
        oauth_timestamp : Math.floor(Date.now() / 1000),
        oauth_signature_method : 'HMAC-SHA1',
        oauth_version : '1.0',
    },
    consumerSecret = `${import.meta.env.VITE_LOCAL_COMSUMER_SECRET}`
    const signature = oauthSignature.generate(method, url, parameters, consumerSecret);

    const auth = `OAuth oauth_consumer_key=${parameters.oauth_consumer_key}, oauth_nonce=${parameters.oauth_nonce}, oauth_signature=${signature}, oauth_signature_method="HMAC-SHA1", oauth_timestamp=${parameters.oauth_timestamp}, oauth_version="1.0"`

    return auth
}

const checkProtocol = () => {
    const currentProtocol = window.location.protocol;

    if (currentProtocol === 'https:') {
        return true
    } else if (currentProtocol === 'http:') {
        return false
    }
}

const listAllPaymentGateways = async (): Promise<WooPaymentGatewayList[]> => {
    try {
        const url = `/wp-json/wc/v2/payment_gateways`

        const req = await fetch(url)

        if(!req.ok) throw Error(`Erro ao listar gateways`)

        const res: WooPaymentGatewayList[] = await req.json()

        return res
    } catch (error) {
        throw error
    }
}

const listProductsMoreSell = async (): Promise<ProductPros[]> => {
    try {

        const url = `${checkProtocol() ? import.meta.env.VITE_PUBLIC_API_URL : import.meta.env.VITE_LOCAL_API_URL}/wc/v3/products`

        if(!url) throw Error(`URL não existente`)

        const req = await fetch(`${url}?featured=${true}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if(!req.ok) throw Error(`Erro ao solicitar informações do site`)

        const res: ProductPros[] = await req.json()

        return res
    } catch (error) {
        throw error
    }
}

const getShopInfos = async (): Promise<ShopInfoTypes> => {
    try {
        const req = await fetch(`/wp-json/shop/v1/infos`)

        const res: ShopInfoTypes = await req.json()

        console.log(`resposta do infos: `, res)

        return res
    } catch (error) {
        throw error
    }
}

interface EmailReturnTypes {
    message: string
    contact_form_id: number
    posted_data_hash: string
}

const sendNewsLetter = async (email: string): Promise<EmailReturnTypes> => {
    try {
        const basicAuth = `admin:${import.meta.env.VITE_API_PASSWORD}`

        const form = new FormData();

        form.append("your-email", email);
        
        const req = await fetch(`/wp-json/contact-form-7/v1/contact-forms/49/feedback`, {
            method:'POST',
            headers: {
                'Authorization': `Basic ${basicAuth}`
            },
            body: form
        })

        if(!req.ok) throw Error(`Erro ao enviar e-mail`)

        const res: EmailReturnTypes = await req.json()

        return res
    } catch (error) {
        throw error
    }
}

//OAuth(url, httpMethod)

const getCategories = async (): Promise<CategoryType[]> => {
    try {
        const url = `/wp-json/wc/v3/products/categories`

        if(!url) throw Error(`URL não existente`)


        const req = await fetch(url)

        if(!req.ok) throw Error(`Erro ao solicitar informações do site`)

        const res: CategoryType[] = await req.json()

        return res
        
    } catch (error) {
        throw error
    }
}


const getNonce = async (): Promise<NonceProps> => {
    try {
        const req = await fetch(`/wp-json/shop/v1/get-nonce`)

        const res = await req.json()

        console.log(`resposta do nonce: `, res)

        return res
    } catch (error) {
        throw error
    }
}

// const getMenus = async (): Promise<any> => {
//     try {
//         const nonce = (await getNonce()).nonce
//         const req = await fetch(`${import.meta.env.VITE_PUBLIC_API_URL}/wp/v2/menu-items`, {
//             headers: {
//                 'X-WP-Nonce': nonce
//             }
//         })

//         if(!req.ok) throw Error(`Erro ao solicitar informações do site`)

//         const res: any = await req.json()

//         console.log(`menus`, res)

//         return res
//     } catch (error) {
//         throw error
//     }
// }

const getCity = async (): Promise<LocationProps> => {
    try {
        const req = await fetch(`https://ipinfo.io/json?token=${import.meta.env.VITE_TOKEN_IP}`)
        if(!req.ok) throw Error(`Erro ao requisitar medias`)

        const res: LocationProps = await req.json()

        return res
    } catch (error) {
        throw error
    }
}

const getSiteMedia = async (mediaId: number): Promise<MediaTypes> => {
    try {
        const req = await fetch(`/wp-json/wp/v2/media/${mediaId}`)
        if(!req.ok) throw Error(`Erro ao requisitar medias`)

        const res: MediaTypes = await req.json()

        return res
    } catch (error) {
        throw error
    }
}

const getProductInfo = async (productId: string | number): Promise<ProductPros> => {
    try {
        const req = await fetch(`/wp-json/wc/v3/products/${productId}`)
        if(!req.ok) throw Error(`Erro ao requisitar medias`)

        const res: ProductPros = await req.json()

        return res
    } catch (error) {
        throw error
    }
}

const getProductVariations = async (variationId: string): Promise<ProductWithVariationsPros[]> => {
    try {
        const req = await fetch(`/wp-json/wc/v3/products/${variationId}/variations`)
        if(!req.ok) throw Error(`Erro ao requisitar medias`)

        const res: ProductWithVariationsPros[] = await req.json()

        return res
    } catch (error) {
        throw error
    }
}

const siteConfig = async (): Promise<ShopTypes> => {
    try {
        const req = await fetch(`/wp-json`)

        if(!req.ok) throw Error(`Erro ao solicitar informações do site`)

        const res: ShopTypes = await req.json()

        return res
    } catch (error) {
        throw error
    }
}

const productReviews = async (product_id: string | number): Promise<ProductReview[]> => {
    try {
        const req = await fetch(`/wp-json/wc/store/products/reviews?product_id=${product_id}`)

        if(!req.ok) throw Error(`Erro ao solicitar reviews`)

        const res: ProductReview[] = await req.json()

        return res
    } catch (error) {
        throw error
    }
}

interface createOrderProps {
    data: OrderPayloadTypes
}

const RemoveItemCart = async (key: string) => {
    try {
        const url = `/wp-json/wc/store/cart/remove-item`
        const nonces = window.wpApiSettings.nonce
        const headers = new Headers();

        headers.append('accept', 'application/json')
        headers.append('Content-Type', 'application/json')

        if(nonces) {
            headers.append('X-WC-Store-API-Nonce', nonces)
        }

        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify({key})
        };
        const req = await fetch(url, options)

        if(!req.ok) throw Error(`Ao remover item do carrinho`)

        const res: CartTypes = await req.json()

        return res
    } catch (error) {
        throw error
    }
}

const addItemToCart = async ({ data }: AddItemToCartPayload): Promise<CartTypes> => {
    try {
        const url = `/wp-json/wc/store/cart/add-item`
        const nonces = window.wpApiSettings.nonce
        const headers = new Headers();

        headers.append('accept', 'application/json')
        headers.append('Content-Type', 'application/json')

        if(nonces) {
            headers.append('X-WC-Store-API-Nonce', nonces)
        }

        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        };
        const req = await fetch(url, options)

        if(!req.ok) throw Error(`Erro listar items do carrinho`)

        const res: CartTypes = await req.json()

        return res
    } catch (error) {
        throw error
    }
}

interface UpdateItemCartProps {
    data: UpdateItemCartPayload
}

const updateProductCart = async ({ data }: UpdateItemCartProps): Promise<CartTypes> => {
    try {
        const url = `/wp-json/wc/store/cart/update-item`
        const nonces = window.wpApiSettings.nonce
        const headers = new Headers();

        headers.append('accept', 'application/json')
        headers.append('Content-Type', 'application/json')

        if(nonces) {
            headers.append('X-WC-Store-API-Nonce', nonces)
        }

        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        };
        const req = await fetch(url, options)

        if(!req.ok) throw Error(`Erro listar items do carrinho`)

        const res: CartTypes = await req.json()

        return res
    } catch (error) {
        throw error
    }
}



const getCart = async (): Promise<CartTypes> => {
    try {
        const url = `/wp-json/wc/store/cart`
        const req = await fetch(url)

        if(!req.ok) throw Error(`Erro listar items do carrinho`)

        const res: CartTypes = await req.json()

        return res
    } catch (error) {
        throw error
    }
}

const createOrder = async ({ data }: createOrderProps): Promise<OrderReturnsType> => {
    try {
        const protocol = checkProtocol()
        const url = `${!protocol ? import.meta.env.VITE_LOCAL_API_URL : import.meta.env.VITE_PUBLIC_API_URL}/wc/v3/orders`
        const auth = OAuth(url, `POST`)
        const credentials = `${import.meta.env.VITE_COMSUMER_KEY}:${import.meta.env.VITE_COMSUMER_SECRET}`;
        const encodedCredentials = btoa(credentials);
        const req = await fetch(url, {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': !protocol ? auth : `Basic ${encodedCredentials}`
            },
            body: JSON.stringify(data)
        })

        if(!req.ok) throw Error(`Erro ao criar ordem`)

        const res: OrderReturnsType = await req.json()

        return res
    } catch (error) {
        throw error
    }
}

const getAddredd = async (cep: string): Promise<ShippingTypes> => {
    try {
        const req = await fetch(`https://viacep.com.br/ws/${cep}/json`)

        if(!req.ok) throw Error(`Erro ao pegar endereço`)

        const res = await req.json()

        return res

    } catch (error) {
        throw error
    }
}

const getAllProductsCategory = async (id: number): Promise<CatalogProductProps[]> => {
    try {
        const url = `/wp-json/wc/v3/products?category=${id}`
        const req = await fetch(url)

        if(!req.ok) throw Error(`Erro ao pegar endereço`)

        const res: CatalogProductProps[] = await req.json()

        return res

    } catch (error) {
        throw error
    }
}

const getAllCatalog = async (): Promise<CatalogProductProps[]> => {
    try {
        const url = `/wp-json/wc/v3/products`
        const req = await fetch(url)

        if(!req.ok) throw Error(`Erro ao pegar endereço`)

        const res: CatalogProductProps[] = await req.json()

        return res

    } catch (error) {
        throw error
    }
}

export { 
    listAllPaymentGateways,
    getAllCatalog,
    getAllProductsCategory,
    siteConfig,
    getSiteMedia, 
    getCity, 
    getCategories, 
    updateProductCart,
    getShopInfos, 
    setNonceToLocalStorage, 
    listProductsMoreSell,
    sendNewsLetter,
    getNonceToLocalStorage,
    getProductInfo,
    getProductVariations,
    productReviews,
    createOrder,
    getCart,
    addItemToCart,
    getAddredd,
    RemoveItemCart
}