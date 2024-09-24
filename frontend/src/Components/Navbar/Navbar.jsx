import React, { useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';

const Navbar = () => {
    const [menu, setMenu] = useState("shop");

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="" />
                <p> AsapSneaks </p>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("shop") }}>Loja {menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("tenis") }}>Tênis {menu === "tenis" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("camisas") }}>Camisas {menu === "camisas" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("acessorios") }}>Acessórios {menu === "acessorios" ? <hr /> : <></>}</li>
            </ul>
            <div className='nav-login-cart'>
                <button>Login</button>
                <img src={cart_icon} alt="" />
                <div className="nav-cart-count">0</div>
            </div>
        </div>
    );
};

export default Navbar;
