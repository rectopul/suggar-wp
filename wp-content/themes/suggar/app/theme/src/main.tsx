import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import InfosProvider from './provider/InfosProvider.tsx'
import { Header } from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import Single from './Single.tsx'

const rootHome = document.getElementById('root')
const rootHeader = document.getElementById('root_header')
const rootFooter = document.getElementById('root_footer')
const rootSingle = document.getElementById('root_single')

if(rootSingle) {
  ReactDOM.createRoot(rootSingle!).render(
    <React.StrictMode>
      <InfosProvider>
        <Single />
      </InfosProvider>
    </React.StrictMode>,
  )
}

if(rootFooter) {
  ReactDOM.createRoot(rootFooter!).render(
    <React.StrictMode>
      <InfosProvider>
        <Footer />
      </InfosProvider>
    </React.StrictMode>,
  )
}

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

