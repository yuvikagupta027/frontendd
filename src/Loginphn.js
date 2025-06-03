import axios from "axios";
import { useEffect, useState } from "react";
import { FaFacebook, FaGoogle, FaLinkedin, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Loginphn() {

    var navi = useNavigate();

    const [showRegister, setShowRegister] = useState(false);

    function submitregistration(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var username = data.get("username");
        var email = data.get("email");
        var password = data.get("password")

        axios.post("https://backend-6-r5ox.onrender.com/registerform", {
            Username: username,
            Email: email,
            Password: password
        }).then((succ) => {
            console.log(succ.data);
            localStorage.setItem("userlogin", succ.data.insertedId)
            e.target.username.focus();
            e.target.reset();
        })
    }

    function submitlogin(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var email = data.get("email");
        var password = data.get("password");

        axios.post("https://backend-6-r5ox.onrender.com/loginform", {
            Email: email,
            Password: password
        }).then((succ) => {
            console.log(succ.data);
            localStorage.setItem("userlogin", succ.data._id)
            navi("/");
        })
    }

    const [id, setid] = useState(localStorage.getItem("userlogin"));

    function checkuser() {
        // console.log(id);
        if (id != null) {
            // console.log("yes");
            axios.post("https://backend-6-r5ox.onrender.com/logincheck", { Id: id }).then((succ) => {
                console.log(succ);
                if (succ.data) {
                    navi("/")
                }
            })
        }
    }

    useEffect(() => {
        setTimeout(() => {
            checkuser();
        }, 500);
    }, [id])

    return (
        <>
            <div className="row m-0 backgrounddphn w-100 card col-lg-8 col-md-10 col-sm-11 col-10 vh-100 container-fluid justify-content-center align-items-center">
                <div className="cardddddd heightphn ">
                    <ul className="nav nav-tabs nav-justified mt-2" id="myTab">
                        <li className="nav-item">
                            <a className="nav-link text-dark active" data-bs-toggle="tab" href="#Signup">Signup</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" data-bs-toggle="tab" href="#Login">Login</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane container active p-2 rounded" id="Signup">
                            <h4 className="text-light fw-bold text-center">Signup</h4>
                            <form className="p-3" onSubmit={submitregistration}>
                                <input type="text" className="form-control bg-light mb-3" placeholder="Username" name="username" />
                                <input type="email" className="form-control bg-light mb-3" placeholder="Email" name="email" />
                                <input type="password" className="form-control bg-light mb-3" placeholder="Password" name="password" />
                                <button type="submit" className="btn btn-secondary form-control"  >Register</button>
                            </form>
                            <p className="text-center text-light">or register with social platforms</p>
                            <span className="d-flex w-100 justify-content-center">
                                <button className="btn border border-1 border-light text-light me-3">
                                    <FaGoogle />
                                </button>
                                <button className="btn border border-1 border-light text-light me-3">
                                    <FaFacebook />
                                </button>
                                <button className="btn border border-1 border-light text-light me-3">
                                    <FaYoutube />
                                </button>
                                <button className="btn border border-1 border-light text-light ">
                                    <FaLinkedin />
                                </button>
                            </span>
                        </div>
                        <div className="tab-pane container p-2 rounded" id="Login">
                            <h4 className="text-light fw-bold text-center">Login</h4>
                            <form className="p-3" onSubmit={submitlogin}>
                                <input type="email" className="form-control bg-light mb-3" placeholder="email" name="email" />
                                <input type="password" className="form-control bg-light mb-3" placeholder="password" name="password" />
                                <button type="submit" className="btn btn-secondary form-control">Login</button>
                            </form>
                            <p className="text-center text-light">or login with social platforms</p>
                            <span className="d-flex w-100 justify-content-center">
                                <button className="btn border border-1 border-light text-light me-3">
                                    <FaGoogle />
                                </button>
                                <button className="btn border border-1 border-light text-light me-3">
                                    <FaFacebook />
                                </button>
                                <button className="btn border border-1 border-light text-light me-3">
                                    <FaYoutube />
                                </button>
                                <button className="btn border border-1 border-light text-light">
                                    <FaLinkedin />
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}