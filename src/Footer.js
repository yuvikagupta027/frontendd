import axios from "axios";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {

    // function submitemail(e) {
    //     e.preventDefault();
    //     var data = new FormData(e.currentTarget);
    //     var email = data.get("email");

    //     axios.post("http://localhost:1000/submitemailfooter", {
    //         email: email,   
    //     }).then((response) => {
    //         console.log(response.data);
    //         alert("Thank you for subscribing!");
    //         e.target.reset(); 
    //     })
    // }

    function submitemail(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const email = data.get("email");

        axios.post("https://backend-6-r5ox.onrender.com/submitemailfooter", {
            email: email,
        }).then((response) => {
            console.log(response.data);
            alert("Thank you for subscribing!");
            e.target.reset();
            e.target.email.focus()
        }).catch((error) => {
            if (error.response && error.response.status === 409) {
                alert("You are already subscribed!");
            } else {
                alert("There was an error, please try again later.");
            }
        });
    }


    return (
        <div className="bg-dark text-white pt-5">
            <div className="container mb-5">
                <div className="bg-purple rounded-4 text-center p-5" style={{ backgroundColor: "#E1732E" }}>
                    <h2 className="fw-bold">Sign up for our newsletter</h2>
                    <p className="mt-3 mb-4">
                        Don't worry, we reserve our newsletter for important news so we only send a few updates a year.
                    </p>
                    <form onSubmit={submitemail}>
                        <div className="d-flex justify-content-center">
                            <input type="email" placeholder="Enter your email" name="email" className="form-control w-50 me-2 rounded-pill" />
                            <button className="btn btn-dark rounded-pill px-4">Get started</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="container">
                <div className="row text-center text-md-start justify-content-around">
                    <div className="col-md-3 col-11 mb-4">
                        <h5 className="fw-bold">Sign up for our newsletter</h5>
                        <p>Don't worry, we reserve our newsletter for important news so we only send a few updates a year.</p>
                        <button className="btn btn-outline-light rounded-pill mt-2">Subscribe</button>
                    </div>
                    <div className="col-md-2 col-4 mb-4">
                        <h5 className="fw-bold">Help and services</h5>
                        <ul className="list-unstyled">
                            <li>How does it work</li>
                            <li>FAQs</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                    <div className="col-md-2 col-4 mb-4">
                        <h5 className="fw-bold">Contact Us</h5>
                        <ul className="list-unstyled">
                            <li>Home</li>
                            <li>Menu</li>
                            <li>Flavours</li>
                        </ul>
                    </div>
                    <div className="col-md-2 col-4 mb-4">
                        <h5 className="fw-bold">Other possibilities</h5>
                        <ul className="list-unstyled">
                            <li>Give away</li>
                            <li>Subscribe</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container-fluid border-top border-secondary mt-4 py-3">
                <div className="row justify-content-between align-items-center text-center">
                    <div className="col-md-6 mb-2 mb-md-0">
                        <small>© yuvikagupta1121@gmail.com</small>
                    </div>
                    <div className="col-md-6">
                        <FaFacebook className="mx-2" size={20} />
                        <FaTwitter className="mx-2" size={20} />
                        <FaInstagram className="mx-2" size={20} />
                        <FaLinkedin className="mx-2" size={20} />
                    </div>
                </div>
            </div>
        </div>
    );
}
