export interface SiteInfoMain {
    full_banner: string | null;
    mini_banner_1: string | null;
    about_excerpt: string | null;
    contact_mail: string | null;
    corporate_reason: boolean;
    logos: Logos;
    copyright: string | null
    cep: string | null;
    media_middle: string;
    menus: Menus;
    ruler_options: RulerOptions;
    about: About;
}

export interface Logos {
    agencia: string;
    empresa: string;
}

export interface Menus {
    [menuName: string]: MenuDeCategoria[];
}

export interface About {
    image:   string;
    content: string;
    title: string
}

export interface MenuDeCategoria {
    ID: number;
    post_author: string;
    post_date: Date;
    post_date_gmt: Date;
    post_content: string;
    post_title: string;
    post_excerpt: string;
    post_status: string;
    comment_status: string;
    ping_status: string;
    post_password: string;
    post_name: string;
    to_ping: string;
    pinged: string;
    post_modified: Date;
    post_modified_gmt: Date;
    post_content_filtered: string;
    post_parent: number;
    guid: string;
    menu_order: number;
    post_type: string;
    post_mime_type: string;
    comment_count: string;
    filter: string;
    db_id: number;
    menu_item_parent: string;
    object_id: string;
    object: string;
    type: string;
    type_label: string;
    title: string;
    url: string;
    target: string;
    attr_title: string;
    description: string;
    classes: string[];
    xfn: string;
}

export interface RulerOptions {
    ruler_options_1: boolean | null | string;
    ruler_options_2: boolean | null | string;
    ruler_options_3: boolean | null | string;
    ruler_options_4: boolean | null | string;
}
