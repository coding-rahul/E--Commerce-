import React, { useState } from 'react';
import PublicHeader from "./Userheader";

const MyLogin = () => {
    let [email, pickemail] = useState("");
    let [pass, pickpass] = useState("");
    let [msg, pickmsg] = useState("Enter Logic details");

    const getLogin = () => {
        if (email == "" || pass == "") {
            pickmsg("Empty Email or password !")
        }
        else {
            pickmsg("Please wait ...")
            var url = "http://localhost:1234/account?email=" + email + "&password=" + pass; //query string
            fetch(url)
                .then(response => response.json())
                .then(accArray => {
                    if (accArray.length > 0) {
                        pickmsg("Sucess .. please wait")
                        localStorage.setItem("fullname", accArray[0].name); //create local storage
                        localStorage.setItem("vid", accArray[0].id);     //create local storage
                        window.location.href = "http://localhost:3000/#/";  //redirect the dashboard
                        window.location.reload();  // refresh the page after going to home page

                    }
                    else {
                        pickmsg("Fail! Invalid email and password")
                    }
                })
        }
    }
    return (
        <>
            <PublicHeader />
            <div className='container mt-5'>
                <div className='row  pt-5'>
                    <div className='col-lg-4'></div>
                    <div className='col-lg-4'>
                        <p className='text-center text-danger'> {msg} </p>
                        <div className='card shadow rounded' >
                            <div className='card-header bg-primary text-white'>
                                <i className='fa fa-lock '></i> Login
                            </div>
                            <div className='card-body'>
                                <div className='mb-3' >
                                    <label>e-mail Id</label>
                                    <input type="text" className='form-control'
                                        onChange={obj => pickemail(obj.target.value)} />
                                </div>
                                <div className='mb-3' >
                                    <label>Password</label>
                                    <input type="password" className='form-control'
                                        onChange={obj => pickpass(obj.target.value)} />
                                </div>
                            </div>
                            <div className='card-footer text-center'>
                                <button className='btn btn-danger ' onClick={getLogin}>Login</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4'></div>

                </div>
            </div>
        </>
    )
}
export default MyLogin;

//json-server --watch data.json --port 1234
