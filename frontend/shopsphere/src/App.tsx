import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './pages/user/SignUp'
import LoginPage from './pages/user/login'
import Home from './pages/user/home'
import ProductDetails from './components/user/ProductDetails'
import ProductPage from './pages/user/ProductPage'
import Cart from './pages/user/Cart'
import SearchResultPage from './pages/user/SearchResultPage'
import Checkout from './pages/user/Checkout'
import MyProfile from './pages/user/MyProfile'
import MyOrders from './pages/user/MyOrder'
import SellerSignUp from './pages/seller/SellerSignUp'
import SellerLoginPage from './pages/seller/SellerLogin'
import SellerHome from './pages/seller/SellerHome'
import AddProduct from './pages/seller/AddProduct'
import SellerDashboard from './pages/seller/SellerDashboard'

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
        <Route path='/sellerhome' element={<SellerHome />} />
        <Route path='/seller/addproduct' element={<AddProduct />} />
        <Route path='/seller/dashboard' element={<SellerDashboard />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;