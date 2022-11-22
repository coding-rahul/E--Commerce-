import React from "react";
import { Link } from 'react-router-dom';

const PublicHeader = () => {
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-3 fixed-top ">
                <div className="container-fluid">
                    <img src="logo3.jpg" alt="logo" width='6%' className="" />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item px-4">
                                <Link className="nav-link active" to="/" >
                                    <i className="fa fa-shopping-bag"></i> Shopping
                                </Link>
                            </li>

                            <li className="nav-item px-4">
                                <Link className="nav-link active" to="/cart" >
                                    <i className="fa fa-shopping-cart"></i> MyCart
                                </Link>
                            </li>

                            <li className="nav-item px-4">
                                <Link className="nav-link active" to="/login" >
                                    <i className="fa fa-lock"></i> MyLogin
                                </Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}
export default PublicHeader;


