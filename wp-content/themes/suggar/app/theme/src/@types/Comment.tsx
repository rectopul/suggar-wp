export interface CommentMain {
    id:                 number;
    post:               number;
    parent:             number;
    author:             number;
    author_name:        string;
    author_url:         string;
    date:               Date;
    date_gmt:           Date;
    content:            Content;
    link:               string;
    status:             string;
    type:               string;
    author_avatar_urls: { [key: string]: string };
    meta:               any[];
    _links:             Links;
}

export interface Links {
    self:       Collection[];
    collection: Collection[];
    up:         Up[];
}

export interface Collection {
    href: string;
}

export interface Up {
    embeddable: boolean;
    post_type:  string;
    href:       string;
}

export interface Content {
    rendered: string;
}
