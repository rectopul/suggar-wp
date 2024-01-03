export interface IntegrationsTypes {
    consumer_key:    string;
    consumer_secret: string;
}

export interface CouponsType {
    id:                          number;
    code:                        string;
    amount:                      string;
    date_created:                Date;
    date_created_gmt:            Date;
    date_modified:               Date;
    date_modified_gmt:           Date;
    discount_type:               string;
    description:                 string;
    date_expires:                null;
    date_expires_gmt:            null;
    usage_count:                 number;
    individual_use:              boolean;
    product_ids:                 any[];
    excluded_product_ids:        any[];
    usage_limit:                 null;
    usage_limit_per_user:        null;
    limit_usage_to_x_items:      null;
    free_shipping:               boolean;
    product_categories:          any[];
    excluded_product_categories: any[];
    exclude_sale_items:          boolean;
    minimum_amount:              string;
    maximum_amount:              string;
    email_restrictions:          any[];
    used_by:                     any[];
    meta_data:                   any[];
    _links:                      Links;
}

export interface Links {
    self:       Collection[];
    collection: Collection[];
}

export interface Collection {
    href: string;
}
