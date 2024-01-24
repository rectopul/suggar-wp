import './App.css'
import FullBanner from './components/FullBanner'
import { About } from './components/About/About'
import { Middle } from './components/Middle/Middle'
import { PostsHome } from './components/Posts/Posts'
import { Newsletter } from './components/Newsletter/Newsletter'

function App() {

  return (
    <>
      <FullBanner />
      <About />
      <Middle />
      <PostsHome />
      <Newsletter />
    </>
  )
}

export default App
