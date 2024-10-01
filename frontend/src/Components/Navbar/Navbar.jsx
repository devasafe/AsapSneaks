import React, { useState, useContext, useRef } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.png'


const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const {getTotalCartItems}=useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open');
    }

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="" />
                <p> AsapSneaks </p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to="/">Loja</Link> {menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("tenis") }}><Link style={{ textDecoration: 'none' }} to="/tenis">Tênis</Link> {menu === "tenis" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("camisas") }}><Link style={{ textDecoration: 'none' }} to="/camisas">Camisas</Link> {menu === "camisas" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("acessorios") }}><Link style={{ textDecoration: 'none' }} to="/acessorios">Acessórios</Link> {menu === "acessorios" ? <hr /> : <></>}</li>
            </ul>
            <div className='nav-login-cart'>
            <Link to="/login"> <button>Login</button></Link>
            <Link to="/cart"> <img src={cart_icon} alt=""/></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    );
};

export default Navbar;
