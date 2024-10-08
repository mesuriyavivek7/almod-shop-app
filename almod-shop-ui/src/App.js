import React from "react";

import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

//importing compnents
import Home from './pages/home/Home'
import Cart from "./pages/cart/Cart";
import Store from "./pages/store/Store";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Product from "./pages/product/Product";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CheckOut from "./pages/checkout/CheckOut";
import BulkOrder from "./pages/bulkorder/BulkOrder";
import Profile from "./pages/profile/Profile";
import RandC from "./pages/r&c/RandC";
import SP from "./pages/sp/SP";
import TOS from "./pages/tos/TOS";
import Career from "./pages/career/Career";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="store">
            <Route index element={<Store></Store>}></Route>
            <Route path=":id" element={<Product></Product>}></Route>
          </Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/contact" element={<Contact></Contact>}></Route>
          <Route path="/product/:id" element={<Product></Product>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/checkout" element={<CheckOut></CheckOut>}></Route>
          <Route path="/bulkorder" element={<BulkOrder></BulkOrder>}></Route>
          <Route path="profile">
            <Route index element={<Profile></Profile>}></Route>
            <Route path=":id" element={<Product></Product>}></Route>
          </Route>
          <Route path="/adminHome" element={<Dashboard />}/>
          <Route path="/career" element={<Career />} />
          <Route path="/randr" element={<RandC></RandC>}></Route>
          <Route path="/sp" element={<SP></SP>}></Route>
          <Route path="/tos" element={<TOS></TOS>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
