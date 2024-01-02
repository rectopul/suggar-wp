import { Header } from "../Header";
import { Product } from "./Product";
import RulerOptions from "../RulerOptions";
import Footer from "../Footer";
import { useState } from "react";

export function ProductApp() {
    const [cartOpen, setCartOpen] = useState<boolean>(false)
    const onCartOpen = () => setCartOpen(true)

    return (
        <>
            <Header cartToogle={cartOpen} handleCartClose={() => setCartOpen(false)} />
            <Product onCartOpen={onCartOpen} />
            <RulerOptions />
            <Footer />
        </>
    )
}