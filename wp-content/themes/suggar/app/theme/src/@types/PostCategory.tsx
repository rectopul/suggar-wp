export interface PostCategoryMain {
    id:          number;
    count:       number;
    description: string;
    link:        string;
    name:        string;
    slug:        string;
    taxonomy:    string;
    parent:      number;
    meta:        any[];
    _links:      Links;
}

export interface Links {
    self:           About[];
    collection:     About[];
    about:          About[];
    up:             Up[];
    "wp:post_type": About[];
    curies:         Cury[];
}

export interface About {
    href: string;
}

export interface Cury {
    name:      string;
    href:      string;
    templated: boolean;
}

export interface Up {
    embeddable: boolean;
    href:       string;
}
