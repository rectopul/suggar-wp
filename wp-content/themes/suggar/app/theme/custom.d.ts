// custom.d.ts
declare global {
    interface Window {
        productPageId?: string;
        wpCheckoutOrder: {
            order: number
        }
    }
}