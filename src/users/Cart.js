import React, { useState, useEffect } from 'react';
import PublicHeader from './Userheader';

const MyCart = () => {
    let [productlist, updateProduct] = useState([]);
    const getProduct = () => {
        fetch("http://localhost:1234/cart")
            .then(response => response.json())
            .then(productArray => {
                updateProduct(productArray.reverse());
            })
    }

    let [msg, updateMsg] = useState("");
    const deleteItem = (id) => {
        var url = "http://localhost:1234/cart/" + id;
        var postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "DELETE"
        };
        fetch(url, postData)
            .then(response => response.json())
            .then(serverRes => {
                updateMsg("Delete From Cart");
                getProduct();// reload the list
            })
    }

    useEffect(() => {
        getProduct();
    }, [true]);

    let [fullname, pickName] = useState("");
    let [mobile, pickMobile] = useState("");
    let [email, pickEmail] = useState("");
    let [address, pickAddress] = useState("");

    const placeorder = () => {
        var orderData = {
            "customername": fullname,
            "mobile": mobile,
            "email": email,
            "address": address,
            "item": productlist
        }
        var postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(orderData)
        };
        var url = "http://localhost:1234/order";
        fetch(url, postData)
            .then(response => response.json())
            .then(serRes => {
                updateMsg("Hi , " + fullname + " your order placed successfully !");
            })
    }

    return (
        <>
            <PublicHeader />
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-lg-4'>
                        <div className='border p-3 rounded mt-4'>
                            <h3 className='text-info text-center'> Customer Details </h3>
                            <div className='mb-3'>
                                <label> Full Name </label>
                                <input type="text" className='form-control'
                                    onChange={obj => pickName(obj.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label> Mobile No </label>
                                <input type="number" className='form-control'
                                    onChange={obj => pickMobile(obj.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label> e-Mail Id </label>
                                <input type="email" className='form-control'
                                    onChange={obj => pickEmail(obj.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label> Delivery Address </label>
                                <textarea className='form-control'
                                    onChange={obj => pickAddress(obj.target.value)}></textarea>
                            </div>
                            <div className='text-center'>
                                <button
                                    className='btn btn-danger btn-lg'
                                    onClick={placeorder}>Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-8'>
                        <h3 className='text-center m-2'> {productlist.length} - Items in Cart </h3>
                        <p className='text-center text-danger'> {msg} </p>
                        <table className='table table-bordered shadow rounded mt-3'>
                            <thead>
                                <tr className='bg-light text-primary'>
                                    <th>Item No</th>
                                    <th>Item Name</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productlist.map((product, index) => {
                                        return (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td> {product.name} </td>
                                                <td>
                                                    <img src={product.photo} height="50" />
                                                </td>
                                                <td>
                                                    <button
                                                        className='btn btn-danger btn-sm'
                                                        onClick={deleteItem.bind(this, product.id)}>
                                                        <i className='fa fa-trash'></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyCart;