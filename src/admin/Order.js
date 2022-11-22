import React, { useEffect, useState } from 'react';
import Adminheader from "./Adminheader";

const Order = () => {
    let [orderlist, updateOrder] = useState([]);

    const getOrder = () => {
        fetch("http://localhost:1234/order")
            .then(response => response.json())
            .then(orderArray => {
                updateOrder(orderArray)
            })
    }
    useEffect(() => {
        getOrder();
    }, [true]);
    return (
        <>
            <Adminheader />
            <div className='container mt-5'>
                <div className='row mb-4'>
                    <div className='col-lg-12 text-center '>
                        <h2 className='text-primary m-2'>Order Management : {orderlist.length}</h2>
                    </div>
                </div>
                {
                    orderlist.map((order, index) => {
                        return (
                            <div className='row mb-4 shadow' key={index} >
                                <div className='col-lg-4'>
                                    <h6>{order.customername}</h6>
                                    <p> Mobile No - {order.mobile}</p>
                                    <p> e-mail - {order.email}</p>
                                    <p> Address - {order.address}</p>
                                </div>
                                <div className='col-lg-8'>
                                    <h5 className='text-center'>  Item : {order.item.length}</h5>
                                    <table className='table'>
                                        <thead>
                                            <tr className='bg-light text-primary'>
                                                <th>Product Id</th>
                                                <th>Product Name</th>
                                                <th>Price</th>
                                                <th>Image</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                order.item.map((Product, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{Product.name}</td>
                                                            <td>{Product.price}</td>
                                                            <td>
                                                                <img src={Product.photo} height="60" />
                                                            </td>

                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>

                                    </table>

                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Order;
