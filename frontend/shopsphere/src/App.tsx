import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp'
import LoginPage from './pages/login'
import Home from './pages/home'
import ProductDetails from './components/ProductDetails'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
import SearchResultPage from './pages/SearchResultPage'
import Checkout from './pages/Checkout'
import MyProfile from './pages/MyProfile'
import MyOrders from './pages/MyOrder'
import SellerSignUp from './pages/SellerSignUp'
import SellerLoginPage from './pages/SellerLogin'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path='/product/detail/:productId' element={<ProductDetails />} />
        <Route path="/product/:category" element={<ProductPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/myprofile' element={<MyProfile />} />
        <Route path='/myorders' element={<MyOrders />} />
        <Route path='/sellersignup' element={<SellerSignUp />} />
        <Route path='/sellerlogin' element={<SellerLoginPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;