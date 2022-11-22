import React from 'react';
import { HashRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./admin/Dashboard";
import Order from "./admin/Order";
import Product from "./admin/Product";

function Adminapp() {
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route exact path="/" element={<Dashboard />} />
                    <Route exact path="/product" element={<Product />} />
                    <Route exact path="/order" element={<Order />} />
                </Routes>
            </HashRouter>

        </>
    );
}

export default Adminapp;
