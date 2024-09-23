
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Shop/>}/>
        <Route path="/tenis" element={<ShopCategory category="tenis"/>}/>
        <Route path="/camisas" element={<ShopCategory category="camisas"/>}/>
        <Route path="/acessorios" element={<ShopCategory category="acessorios"/>}/>
        <Route path="product" element={<Product/>}>
        <Route path=":productId" element={<Product/>}/>
        </Route>
        <Route path="/cart" element={<cart/>}/>
      
      </Routes>


      </BrowserRouter>
    </div>
  );
}

export default App;
