import React, { useState, useEffect } from 'react';
import PublicHeader from './Userheader';
import ReactPaginate from 'react-paginate';
const PER_PAGE = 4;


const Myhome = () => {
    let [productlist, updateProduct] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const getProduct = () => {
        fetch("http://localhost:1234/product")
            .then(response => response.json())
            .then(productArray => {
                updateProduct(productArray.reverse());
            })
    }

    useEffect(() => {
        getProduct();
    }, [true]);

    let [msg, updateMsg] = useState("");

    const addtoCart = (iteminfo) => {
        var url = "http://localhost:1234/cart";
        var postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(iteminfo)
        };
        fetch(url, postData)
            .then(response => response.json())
            .then(serverRes => {
                updateMsg(iteminfo.name + " Added in Your Cart !");
            })
    }
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(productlist.length / PER_PAGE);

    return (
        <>
            <PublicHeader />
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-lg-8 text-center'>
                        <h1 className='text-info'> @Keep Shopping... </h1>
                        <p className='text-danger'>{msg}</p>
                    </div>
                    <div className='col-lg-4'>
                        <div className='input-group'>
                            <input type="text" className='form-control'
                                placeholder='Search'
                                onChange={obj => setSearchInput(obj.target.value)} />
                            <span className='input-group-text bg-danger'>
                                <i className='fa fa-search '></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='row mt-5'>
                    {
                        productlist.filter((item) => {
                            if (searchInput === "") {
                                return item;
                            }
                            else if (
                                item.name.toLowerCase().includes(searchInput.toLowerCase())
                            ) {
                                return item;
                            }
                        })
                            .slice(offset, offset + PER_PAGE)
                            .map((iteminfo, index) => {
                                return (
                                    <div className='col-lg-3 mb-4 text-center' key={index}>
                                        <h3 className='text-primary'> {iteminfo.name} </h3>
                                        <img src={iteminfo.photo} height="130" width="70%" className='rounded' />
                                        <h4 className='text-success mt-2'>Rs. {iteminfo.price}/kg </h4>
                                        <p className='mt-2'>
                                            {iteminfo.details}
                                        </p>
                                        <button className='btn btn-danger btn-sm' onClick={addtoCart.bind(this, iteminfo)}>
                                            <i className='fa fa-shopping-cart'></i> Add To Cart
                                        </button>
                                    </div>
                                )
                            })
                    }
                </div>
                <div className="mb-4 mt-4">
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination  justify-content-center"}
                        pageClassName={"page-item "}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active primary"}
                    />
                </div>

            </div>
        </>
    )
}

export default Myhome;

