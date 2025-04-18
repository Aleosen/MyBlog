import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Main from './pages/main/Main'
import NavBar from './components/layout/NavBar'
import Blogs from './pages/blogs/Blogs'
import CreateBlog from './pages/create-blog/CreateBlog'
import Footer from './components/layout/Footer'
import Blog from './pages/blog-info/Blog'
import ScrollToTop from './utils/ScrollToTop'
import Registration from './pages/register/Registration'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/login/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { useLocation } from 'react-router-dom'
import About from './pages/about/About'
function App() {
  const location = useLocation();

    // Укажи путь страницы, где нужно скрыть футер
    const hideFooterOnPaths = ["/blogs"];
    const shouldHideFooter = hideFooterOnPaths.includes(location.pathname);

  return (
    <AuthProvider>
        <ScrollToTop/>
        <div className="flex flex-col min-h-screen">
          <NavBar/>
          <main className="flex-1">
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/blogs' element={<Blogs/>}/>
            <Route path='/create-blog' element={
              <ProtectedRoute>
                <CreateBlog/>
              </ProtectedRoute>
              }/>
            <Route path='/blogs/:id' element={<Blog/>}/>
            <Route path='/register' element={<Registration/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/about' element={<About/>}/>
          </Routes>
          </main>
          {!shouldHideFooter && <Footer/>}
        </div>
    </AuthProvider>
  )
}

export default App
