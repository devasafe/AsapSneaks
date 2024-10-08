
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Shop from './Pages/Shop';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>

        <Route path='/' element={<Shop/>}/>
        <Route path='/tenis' element={<ShopCategory banner = {men_banner} category="tenis"/>}/>
        <Route path='/camisas' element={<ShopCategory banner = {women_banner} category="camisas"/>}/>
        <Route path='/acessorios' element={<ShopCategory banner = {kid_banner} category="acessorios"/>}/>
        <Route path='/product' element={<Product/>}>
          <Route path='/product/:productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>

      </Routes>
      
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
