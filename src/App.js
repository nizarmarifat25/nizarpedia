import HomePage from "./component/HomePage/HomePage";
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./component/Login/Login";
import cookie from 'js-cookie'
import { useEffect, useState } from "react";
import Navigation from "./component/Navigation/Navigation";
import ProductById from './component/Product/ProductById'
import Checkout from "./component/Checkout/Checkout";
import Transaction from "./component/Account/Transaction";
import Cart from "./component/Cart/Cart"

function App() {
  const [token, setToken] = useState(cookie.get('token'))
  const [update, setUpdate] = useState(false)
  const getToken = (token) => {
    setToken(token)
  }
  const updated = (param) =>{
    setUpdate(param)
  }
  
  useEffect(() => {
  }, [update])
  
  
  return (
    <>
      {token ? <Navigation getToken={getToken}  updated={update}/> : null}
      <Routes>
        <Route path="/login" element={token ? <Navigate to='/' replace /> : <Login getToken={getToken} />} />
        <Route path="/" element={token ? <HomePage /> : <Navigate to='/login' replace />} />
        <Route path="/product/:id" element={token ? <ProductById updated={updated} update={update}/> : <Navigate to='/login' replace />} />
        <Route path="/checkout" element={token ? <Checkout /> : <Navigate to='/login' replace />} />
        <Route path="/transaction" element={token ? <Transaction /> : <Navigate to='/login' replace />} />
        <Route path="/cart" element={token ? <Cart /> : <Navigate to='/login' replace />} />
      </Routes>

    </>
  );
}

export default App;
