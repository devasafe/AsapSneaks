
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Shop from './Pages/Shop';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>

        <Route path='/' element={<Shop/>}/>
        <Route path='/tenis' element={<ShopCategory category="tenis"/>}/>
        <Route path='/camisas' element={<ShopCategory category="Camisas"/>}/>
        <Route path='/acessorios' element={<ShopCategory category="Acessorios"/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/product/:productId' element={<Product/>}/>

        
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>

      </Routes>
      
      
      </BrowserRouter>
    </div>
  );
}

export default App;
