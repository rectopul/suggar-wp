import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import InfosProvider from './provider/InfosProvider.tsx'
import { Header } from './components/Header.tsx'
import RulerOptions from './components/RulerOptions.tsx'
import Footer from './components/Footer.tsx'
import { Checkout } from './components/Checkout/Checkout.tsx'
import { Catalog } from './components/Catalog/Catalog.tsx'
import { ProductApp } from './components/Product/ProductApp.tsx'

const rootHome = document.getElementById('root')
const rootProduct = document.getElementById('root_product')
const rootCheckout = document.getElementById('root_checkout')
const rootCatalog = document.getElementById('root_catalog')
const rootShop = document.getElementById('root_shop')
const rootHeader = document.getElementById('root_header')

if(rootHome) {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <InfosProvider>
        <App />
      </InfosProvider>
    </React.StrictMode>,
  )
}


if(rootHeader) {
  ReactDOM.createRoot(rootHeader!).render(
    <React.StrictMode>
      <InfosProvider>
        <Header />
      </InfosProvider>
    </React.StrictMode>,
  )
}

if(rootProduct) {
  ReactDOM.createRoot(rootProduct!).render(
    <React.StrictMode>
      <InfosProvider>
        <ProductApp />
      </InfosProvider>
    </React.StrictMode>,
  )
}

if(rootCheckout) {
  ReactDOM.createRoot(rootCheckout!).render(
    <React.StrictMode>
      <InfosProvider>
        <Header />
        <Checkout />
        <RulerOptions />
        <Footer />
      </InfosProvider>
    </React.StrictMode>,
  )
}

if(rootShop) {
  ReactDOM.createRoot(rootShop!).render(
    <React.StrictMode>
      <InfosProvider>
        <Header />
        <Catalog />
        <RulerOptions />
        <Footer />
      </InfosProvider>
    </React.StrictMode>,
  )
}

if(rootCatalog) {
  ReactDOM.createRoot(rootCatalog!).render(
    <React.StrictMode>
      <InfosProvider>
        <Header />
        <Catalog />
        <RulerOptions />
        <Footer />
      </InfosProvider>
    </React.StrictMode>,
  )
}
