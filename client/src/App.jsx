import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Main from './pages/main/Main'
import NavBar from './components/layout/NavBar'
import Blogs from './pages/blogs/Blogs'
import CreateBlog from './pages/create-blog/CreateBlog'
import Footer from './components/layout/Footer'
import Blog from './pages/blog-info/Blog'
import ScrollToTop from './utils/ScrollToTop'
function App() {

  return (
    <Router>
      <ScrollToTop/>
      <div className="flex flex-col min-h-screen">
        <NavBar/>
        <main className="flex-1">
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path='/create-blog' element={<CreateBlog/>}/>
          <Route path='/blogs/:id' element={<Blog/>}/>
        </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
