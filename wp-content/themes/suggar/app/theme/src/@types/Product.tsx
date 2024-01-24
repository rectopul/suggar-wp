export interface ParamsGetProductTypes {
    context?: string
    page?: number
    per_page?: number
    search?: string
    after?: string
    before?: string
    modified_after?: string
    modified_before?: string
    dates_are_gmt?: boolean
    exclude?: number[]
    include?: number[]
    offset?: number
    order?: string
    orderby?: string
    parent?: number[]
    parent_exclude?: number[]
    slug?: string
    status?: string
    type?: string
    sku?: string
    featured?: boolean
    category?: string
    tag?: string
    shipping_class?: string
    attribute?: string
    attribute_term?: string
    tax_class?: string
    on_sale?: boolean
    min_price?: string
    max_price?: string
    stock_status?: string
}

export interface ProductTypes {
    id:                    number;
    name:                  string;
    slug:                  string;
    permalink:             string;
    date_created:          Date;
    date_created_gmt:      Date;
    date_modified:         Date;
    date_modified_gmt:     Date;
    type:                  string;
    status:                string;
    featured:              boolean;
    catalog_visibility:    string;
    description:           string;
    short_description:     string;
    sku:                   string;
    price:                 string;
    regular_price:         string;
    sale_price:            string;
    date_on_sale_from:     null;
    date_on_sale_from_gmt: null;
    date_on_sale_to:       null;
    date_on_sale_to_gmt:   null;
    on_sale:               boolean;
    purchasable:           boolean;
    total_sales:           number;
    virtual:               boolean;
    downloadable:          boolean;
    downloads:             any[];
    download_limit:        number;
    download_expiry:       number;
    external_url:          string;
    button_text:           string;
    tax_status:            string;
    tax_class:             string;
    manage_stock:          boolean;
    stock_quantity:        null;
    backorders:            string;
    backorders_allowed:    boolean;
    backordered:           boolean;
    low_stock_amount:      null;
    sold_individually:     boolean;
    weight:                string;
    dimensions:            Dimensions;
    shipping_required:     boolean;
    shipping_taxable:      boolean;
    shipping_class:        string;
    shipping_class_id:     number;
    reviews_allowed:       boolean;
    average_rating:        string;
    rating_count:          number;
    upsell_ids:            any[];
    cross_sell_ids:        any[];
    parent_id:             number;
    purchase_note:         string;
    categories:            Category[];
    tags:                  Category[];
    images:                Image[];
    attributes:            Attribute[];
    default_attributes:    any[];
    variations:            number[];
    grouped_products:      any[];
    menu_order:            number;
    price_html:            string;
    related_ids:           number[];
    meta_data:             MetaDatum[];
    stock_status:          string;
    has_options:           boolean;
    post_password:         string;
    _links:                Links;
}

export interface Links {
    self:       Collection[];
    collection: Collection[];
}

export interface Collection {
    href: string;
}

export interface Attribute {
    id:        number;
    name:      string;
    position:  number;
    visible:   boolean;
    variation: boolean;
    options:   string[];
}

export interface Category {
    id:   number;
    name: string;
    slug: string;
}

export interface Dimensions {
    length: string;
    width:  string;
    height: string;
}

export interface Image {
    id:                number;
    date_created:      Date;
    date_created_gmt:  Date;
    date_modified:     Date;
    date_modified_gmt: Date;
    src:               string;
    name:              string;
    alt:               string;
}

export interface MetaDatum {
    id:    number;
    key:   string;
    value: string;
}

export interface SinglePostMain {
    id: number;
    title: string
    content: string
    image: string
    author: string
    date: string
    comments: Comment[]
    breadcrumbs: Breadcrumb[]
  }
  
  export interface Comment {
    comment_ID: string
    comment_post_ID: string
    comment_author: string
    comment_author_email: string
    comment_author_url: string
    comment_author_IP: string
    comment_date: string
    comment_date_gmt: string
    comment_content: string
    comment_karma: string
    comment_approved: string
    comment_agent: string
    comment_type: string
    comment_parent: string
    user_id: string
  }
  
  export interface Breadcrumb {
    name: string
    link: string
  }
