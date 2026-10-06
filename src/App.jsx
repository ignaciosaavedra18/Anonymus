import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Offers from './pages/Offers'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import PurchaseResult from './pages/PurchaseResult'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Blogs from './pages/Blogs'
import Contact from './pages/Contact'
import About from './pages/About'
import Admin from './pages/Admin'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/categorias" element={<Categories />} />
        <Route path="/ofertas" element={<Offers />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/compra-exitosa" element={<PurchaseResult success />} />
        <Route path="/compra-fallida" element={<PurchaseResult success={false} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  )
}

export default App
