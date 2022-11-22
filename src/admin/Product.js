import React, { useState, useEffect } from 'react';
import Adminheader from "./Adminheader";

const Product = () => {
    let [productlist, updateproduct] = useState([]);

    const getProduct = () => {
        fetch("http://localhost:1234/product")
            .then(response => response.json())
            .then(productArray => {
                updateproduct(productArray);
            })
    }

    useEffect(() => {
        getProduct();
    }, [true]);

    const [message, setmsg] = useState("")
    const deleteItem = (id) => {
        let url = "http://localhost:1234/product/" + id;
        const postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "DELETE"
        };
        fetch(url, postData)
            .then(res => res.json())
            .then(data => {
                setmsg("Delete from the cart")
                getProduct();

            })
    }

    let [pname, pickName] = useState("");
    let [pprice, pickprice] = useState("");
    let [pphoto, pickphoto] = useState("");
    let [pdetail, pickdetail] = useState("");
    let [msg, updatedmsg] = useState("");

    const save = () => {
        var orderData = {
            "name": pname,
            "price": pprice,
            "photo": pphoto,
            "details": pdetail
        }

        var postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(orderData)
        };
        var url = "http://localhost:1234/product";
        fetch(url, postData)
            .then(response => response.json())
            .then(serRes => {                  //earlier I only update state but we perform many requirment using {}.
                updatedmsg(pname + " save successfully !");
                pickName(""); pickprice(""); pickphoto(""); pickdetail("");
                getProduct();
            })
    }

    return (
        <>
            <Adminheader />
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-lg-3'>
                        <div className='border p-3 shadow rounded'>
                            <h3 className='text-center'> New Product</h3>
                            <hr />
                            <div className='mb-3'>
                                <label>Product Name </label>
                                <input type="text" className='form-control'
                                    onChange={obj => pickName(obj.target.value)}
                                    value={pname}
                                />

                            </div>
                            <div className='mb-3'>
                                <label>Product price </label>
                                <input type="text" className='form-control'
                                    onChange={obj => pickprice(obj.target.value)}
                                    value={pprice}
                                />
                            </div>
                            <div className='mb-3'>
                                <label>Product image </label>
                                <input type="text" className='form-control'
                                    onChange={obj => pickphoto(obj.target.value)}
                                    value={pphoto}
                                />
                            </div>
                            <div className='mb-3'>
                                <label>Product details </label>
                                <textarea type="text" className='form-control'
                                    onChange={obj => pickdetail(obj.target.value)}
                                    value={pdetail}

                                ></textarea>
                            </div>
                            <div className='text-center'>
                                <button className='btn btn-primary' onClick={save}> Save Product</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-9'>
                        <h3 className='text-center text-info mb-3'> Product List</h3>
                        <p className='text-center text-danger'> {msg} </p>
                        <p className='text-center text-danger'> {message} </p>

                        <table className='table table-bordered shadow rounded'>
                            <thead>
                                <tr className='bg-light text-primary fw-bold'>
                                    <td> Id</td>
                                    <td> Name</td>
                                    <td>price </td>
                                    <td>Image</td>
                                    <td>details</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productlist.map((product, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td>
                                                    <img src={product.photo} height="50" width="60" />
                                                </td>
                                                <td>{product.details}</td>
                                                <td>
                                                    <button className='btn btn-danger btn-sm' onClick={deleteItem.bind(this, product.id)}>
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
export default Product;
