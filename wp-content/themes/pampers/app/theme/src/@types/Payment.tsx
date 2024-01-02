export interface WooPaymentGatewayList {
    id:                     string;
    title:                  string;
    description:            string;
    order:                  number | string;
    enabled:                boolean;
    method_title:           string;
    method_description:     string;
    settings:               any[] | SettingsClass;
    needs_setup:            boolean;
    post_install_scripts:   any[];
    settings_url:           string;
    connection_url:         null;
    setup_help_text:        null;
    required_settings_keys: any[];
    _links:                 Links;
}

export interface Links {
    self:       Collection[];
    collection: Collection[];
}

export interface Collection {
    href: string;
}

export interface SettingsClass {
    title:               EnableForMethods;
    instructions:        EnableForMethods;
    enable_for_methods?: EnableForMethods;
    enable_for_virtual?: EnableForMethods;
}

export interface EnableForMethods {
    id:          string;
    label:       string;
    description: string;
    type:        string;
    value:       string;
    default:     string;
    tip:         string;
    placeholder: string;
    options?:    Options;
}

export interface Options {
    "Taxa fixa":         TaxaFixa;
    "Frete grátis":      FreteGrátis;
    "Retirada no local": RetiradaNoLocal;
}

export interface FreteGrátis {
    free_shipping: string;
}

export interface RetiradaNoLocal {
    local_pickup: string;
}

export interface TaxaFixa {
    flat_rate: string;
}
