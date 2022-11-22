import React, { useEffect, useState } from 'react';
import Adminheader from "./Adminheader";

const Dashboard = () => {
    let [orderlist, updateOrder] = useState([]);
    let [productlist, updateproduct] = useState([]);

    const getOrder = () => {
        fetch("http://localhost:1234/order")
            .then(response => response.json())
            .then(orderArray => {
                updateOrder(orderArray)
            })
    }
    const getProduct = () => {
        fetch("http://localhost:1234/product")
            .then(response => response.json())
            .then(productArray => {
                updateproduct(productArray)
            })
    }

    useEffect(() => {
        getProduct();
        getOrder();
    }, [true]);
    return (
        <>
            <Adminheader />
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <h2 className='text-center text-primary'>
                            Vender Dashboard
                        </h2>
                    </div>
                </div>{/**row end here */}
                <div className='mt-5 row text-center'>
                    <div className='col-lg-2'></div>
                    <div className='col-lg-4'>
                        <div className='p-4 rounded shadow border '>
                            <i className='fa fa-suitcase fa-4x text-primary' ></i>
                            <h4 className='m-3'>{productlist.length} -products</h4>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='p-4 rounded shadow border '>
                            <i className='fa fa-phone fa-4x text-warning' ></i>
                            <h4 className='m-3'>{orderlist.length} -order</h4>
                        </div>
                    </div>
                    <div className='col-lg-2'></div>

                </div>
            </div>
        </>
    )
}
export default Dashboard;
//json-server --watch data.json --port 1234
