import { HashRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import MyHome from "./users/Home";
import MyLogin from "./users/Login";
import MyCart from "./users/Cart";


function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<MyHome />} />
          <Route exact path="/login" element={<MyLogin />} />
          <Route exact path="/cart" element={<MyCart />} />
        </Routes>
      </HashRouter>

    </>
  );
}

export default App;
