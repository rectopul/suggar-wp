import { SinglePostMain } from "../@types/Product"

declare global {
    interface Window {
        categoryProps?: {
            title: string
            id: number
        }

        post_info?: SinglePostMain

        wpApiSettings: {
            root: string
            nonce: string
        }
        product_Infos: {
            id: number
            variations: PaTamanhoTypes
        }
        wpCheckoutOrder: {
            order: number
        }
    }
}

interface ImagesCategory {
    name: string
    src: string
}

export interface CatalogProductProps {
    id: number
    images: ImagesCategory[]
    name: string
    permalink: string
    price: string
}

interface PaTamanhoTypes {
    pa_tamanho?: TaxonomyTypes[]
}

interface TaxonomyTypes {
    count: number
    description: string | null
    filter: string
    name: string
    parent: number
    slug: string
    taxonomy: string
    term_group: number
    term_id: number
    term_taxonomy_id: number
}

interface SizesTypes {
    file: string
    width: number
    height: number
    filesize: number
    mime_type: string
    source_url: string
}

interface CategoryLinksType {
    href: string
}

type MenuType = {
    ID: number
    post_author: string
    post_date: string
    post_date_gmt: string
    post_content: string
    post_title: string
    post_excerpt: string
    post_status: string
    comment_status: string
    ping_status: string
    post_name: string
    menu_order: number
    post_type: string
    object: string
    type: string
    url: string
    title: string
    attr_title: string
    description: string
}

export interface UserLoggedType {
    id: number
    name: string
}

export interface ShopInfoTypes {
    full_banner: string
    mini_banner_1: string
    about_excerpt: string
    contact_mail: string
    corporate_reason: string
    cep: string
    menus: {
        footer: MenuType[]
    }
    ruler_options: {
        ruler_options_1: string
        ruler_options_2: string
        ruler_options_3: string
        ruler_options_4: string
    }
}

export interface ImageProps {
    id:  number
    date_created?: string
    date_created_gmt?:  string
    date_modified?:  string
    date_modified_gmt?:  string
    src:  string
    srcset?: string
    sizes?: string
    name:  string
    alt:  string
    thumbnail?: string
}

interface AttributesProps {
    id: number
    name: string
    position: number
    visible: boolean
    variation: boolean
    options: string[]
}

export interface SingleAttributesProps {
    id: number
    name: string
    position: number
    visible: boolean
    variation: boolean
    option: string
}

interface SimpleCategory {
    id: number
    name: string
    slug: string
}

export interface ProductWithVariationsPros {
    id: number
    date_created: string
    date_created_gmt: string
    date_modified: string
    date_modified_gmt: string
    description: string
    permalink: string
    sku: string
    price: string
    regular_price: string
    sale_price: string
    date_on_sale_from: string | null
    date_on_sale_from_gmt: string |null
    date_on_sale_to: string | null
    date_on_sale_to_gmt: string | null
    on_sale: boolean
    status: string
    purchasable: boolean
    virtual: boolean
    downloadable: boolean
    download_limit: number
    download_expiry: number
    tax_status: string
    tax_class: string
    manage_stock: boolean
    stock_quantity: number | null
    stock_status: string
    backorders: string
    backorders_allowed: boolean
    backordered: boolean
    low_stock_amount: number | null
    weight: number | null
    dimensions: {
        length: number | null
        width: number | null
        height: number | null
    }
    shipping_class: string | null
    shipping_class_id: number
    image: ImageProps
    attributes: SingleAttributesProps[]
    menu_order: number
    meta_data: string[]
}

interface OrderProductType {
    product_id: number
    quantity: number
}

interface shipping_linesType {
    method_id: string
    method_title: string
    total: string
}

interface VariationTypes {
    attribute: string
    value: string
}

interface CartItemPricesType {
    price: string
    regular_price: string
    sale_price: string
    price_range: string | null
    currency_code: string
    currency_symbol: string
    currency_minor_unit: number
    currency_decimal_separator: string
    currency_thousand_separator: string
    currency_prefix: string
    currency_suffix: string | null
    raw_prices: {
        precision: number
        price: string
        regular_price: string
        sale_price: string
    }
}

interface CartTotalsType {
    line_subtotal: string
    line_subtotal_tax: string
    line_total: string
    line_total_tax: string
    currency_code: string
    currency_symbol: string
    currency_minor_unit: number
    currency_decimal_separator: string
    currency_thousand_separator: string
    currency_prefix: string
    currency_suffix: string
}

interface VariationPayloadTypes {
    attribute: string
    value: string
}


export interface AddItemToCartPayload {
    data: {
        id: number
        quantity: number
        variation?: VariationPayloadTypes[]
    }
}

export interface ItemCartPTypes {
    key: string
    id: number
    quantity: number
    quantity_limits: {
        minimum: number
        maximum: number
        multiple_of: number
        editable: boolean
    },
    name: string
    short_description: string
    description: string
    sku: string | null
    low_stock_remaining: number | null
    backorders_allowed: boolean
    show_backorder_badge: boolean
    sold_individually: boolean
    permalink: string
    images: ImageProps[]
    variation: VariationTypes[]
    item_data: []
    prices: CartItemPricesType
    totals: CartTotalsType
    catalog_visibility: string
    extensions: {}
}

interface CartTotalItemsType {
    total_items: string
    total_items_tax: string
    total_fees: string
    total_fees_tax: string
    total_discount: string
    total_discount_tax: string
    total_shipping: string
    total_shipping_tax: string
    total_price: string
    total_tax: string
    tax_lines: [],
    currency_code: string
    currency_symbol: string
    currency_minor_unit: number
    currency_decimal_separator: string
    currency_thousand_separator: string
    currency_prefix: string
    currency_suffix: string
}

interface billingTypes {
    first_name: string
    last_name: string
    company: string | null
    address_1: string
    address_2?: string
    city: string
    state: string
    postcode: string
    country: string
    email: string
    phone: string
}

export interface UpdateItemCartPayload {
    key: string
    quantity: number
}

export interface CartTypes {
    items: ItemCartPTypes[]
	coupons: []
	fees: []
	totals: CartTotalItemsType
	shipping_address: billingTypes
	billing_address: billingTypes
	needs_payment: boolean
	needs_shipping: boolean
	payment_requirements: string[],
	has_calculated_shipping: boolean
	shipping_rates: [],
	items_count: number
	items_weight: number
	cross_sells: [],
	errors: [],
	payment_methods: string[]
	extensions: {}
}

export interface ShippingTypes {
    cep: string
    logradouro: string
    complemento: string
    bairro: string
    localidade: string
    uf: string
    ibge: string
    gia: string
    ddd: string
    siafi: string
}

export interface ShippintTheTypes {
    first_name: string
    last_name: string
    address_1: string
    address_2?: string
    email?: string
    phone?: string
    city: string
    state: string
    postcode: string
    country: string
}

export interface OrderReturnsType {
    payment_url: string
    payment_method_title: string
}

export interface OrderPayloadTypes {
    payment_method: string
    payment_method_title: string
    set_paid: boolean
    billing: ShippintTheTypes
    shipping: ShippintTheTypes
    line_items: OrderProductType[]
    shipping_lines: shipping_linesType[]
}

export interface ProductReview {
    id: number
    date_created: string
    formatted_date_created: string
    date_created_gmt: string
    product_name: string
    product_permalink: string
    product_image: {
        id: number
        src: string
        thumbnail: string
        sizes: string
        name: string
        alt: string | null
        srcset: string
    }
    product_id: number
    reviewer: string
    review: string 
    rating: string
    verified: boolean
    reviewer_avatar_urls: {
        '24':  string
        '48':  string
        '96':  string
    }
}

export interface ProductPros {
    id: number
    name: string
    slug: string
    permalink: string
    date_created: string
    date_created_gmt: string
    date_modified: string
    date_modified_gmt: string
    type: string
    status: string
    featured: boolean
    catalog_visibility: string
    description: string
    short_description: string
    sku: string
    price: string
    regular_price: string
    sale_price: string
    date_on_sale_from: string | null
    date_on_sale_from_gmt: string | null
    date_on_sale_to: string | null
    date_on_sale_to_gmt: string | null
    price_html: string
    on_sale: boolean
    purchasable: boolean
    average_rating: string
    rating_count: number
    total_sales: number
    virtual: boolean
    downloadable: boolean
    downloads: []
    download_limit: number
    download_expiry: number
    external_url: string
    button_text: string
    tax_status: string
    tax_class: string
    shipping_required: boolean
    shipping_taxable: boolean
    shipping_class: string
    shipping_class_id: number
    reviews_allowed: boolean
    related_ids: number[]
    images: ImageProps[]
    categories: SimpleCategory[]
    attributes: AttributesProps[]
    variations: number[]
}


export interface CategoryType {
    id: number
    name: string
    slug: string
    parent: number
    description: string
    display: string
    image: string | null
    menu_order: number
    count: number
    _links: {
        self: CategoryLinksType[]
        collection: CategoryLinksType[]
    }
}


export interface LocationProps {
    country: string
    countryCode: string
    region: string
    regionName: string
    city: string
    timezone: string
    query: string
}

export interface MediaTypes {
    source_url: string
    media_details: {
        file: string
        sizes: {
            medium: SizesTypes
            thumbnail: SizesTypes
            woocommerce_thumbnail: SizesTypes
            woocommerce_gallery_thumbnail: SizesTypes
            full: SizesTypes
        }
    }
}

export interface MenuItemsTypes {
    id: number
    title: {
        rendered: string
    }
    status: string
    url: string
    attr_title: string
    description: string
    type_label: string
    parent: number
    menu_order: number
    classes: string[]
}

export interface ShopTypes {
    name: string
    url: string
    timezone_string: string
    namespaces: string[]
    authentication: []
    site_icon_url: string | null
    site_icon: number
    site_logo: number
    _links: {
        'wp:featuredmedia': [
            {
                embeddable: boolean
                type: string
                href: string
            }
        ]
        curies: [
            {
                name: string
                href: string
                templated: string
            }
        ]
    }
}