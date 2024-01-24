export interface UserMain {
    id:          number;
    name:        string;
    url:         string;
    description: string;
    link:        string;
    slug:        string;
    avatar_urls: { 
        "24": string
        "48": string
        "96": string
     };
    meta:        any[];
    _links:      Links;
}

export interface Links {
    self:       Collection[];
    collection: Collection[];
}

export interface Collection {
    href: string;
}
