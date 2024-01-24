import './App.css'
import { Newsletter } from './components/Newsletter/Newsletter'
import { BreadCumb } from './components/Braeadcumb/Breadcumb'
import { Post } from './components/Post/Post'

function Single() {

  return (
    <>
        <BreadCumb />
        <Post />
        <Newsletter />
    </>
  )
}

export default Single
