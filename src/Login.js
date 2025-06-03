import axios from "axios";
import { useEffect, useState } from "react";
import { FaFacebook, FaGoogle, FaLinkedin, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Login() {

    var navi = useNavigate();

    const [showRegister, setShowRegister] = useState(false);

    function submitregistration(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var username = data.get("username");
        var email = data.get("email");
        var password = data.get("password");

        axios.post("http://localhost:1000/registerform", {
            Username: username,
            Email: email,
            Password: password
        }).then((succ) => {
            console.log(succ.data);

            if (succ.data.alreadyRegistered) {
                // If backend says user already registered
                alert("You are already registered. Please login!");
                setShowRegister(false);  // Switch to login form
            } else {
                alert("User Registered Successfully!");
                localStorage.setItem("userlogin", succ.data.insertedId);
                e.target.username.focus();
                e.target.reset();
                navi("/");
            }
        })
    }

    function submitlogin(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var email = data.get("email");
        var password = data.get("password");

        axios.post("http://localhost:1000/loginform", {
            Email: email,
            Password: password
        }).then((succ) => {
            console.log(succ.data);

            if (succ.data && succ.data._id) {
                // Login success
                localStorage.setItem("userlogin", succ.data._id);
                navi("/");
            } else {
                // Login failed
                alert("Wrong credentials. Please try again.");
            }
        })
    }

    const [id, setid] = useState(localStorage.getItem("userlogin"));

    function checkuser() {
        // console.log(id);
        if (id != null) {
            // console.log("yes");
            axios.post("http://localhost:1000/logincheck", { Id: id }).then((succ) => {
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
            // checkpass();
        }, 500);
    }, [id])


    return (
        <>
            <div className="backgroundddd vh-100 container-fluid row m-0 justify-content-center align-items-center">
                <div className="col-lg-8 col-md-10 col-sm-11 col-12 h-75">
                    <div className="h-100 w-100 bg-danger m-auto mycard">
                        <div className="h-100 login w-100 d-flex bg-light"
                            style={{
                                transform: showRegister ? "translateX(-0.002%)" : "translateX(0%)"
                            }}>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6 d-flex justify-content-center align-items-center">
                                <div className="w-100">
                                    <h4 className="fw-bold text-center">Registration</h4>
                                    <form className="p-3" onSubmit={submitregistration}>
                                        <input type="text" className="form-control bg-light mb-3" placeholder="Username" name="username" />
                                        <input type="email" className="form-control bg-light mb-3" placeholder="Email" name="email" />
                                        <input type="password" className="form-control bg-light mb-3" placeholder="Password" name="password" />
                                        <button type="submit" className="btn btn-secondary form-control"  >Register</button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6 right-oval d-flex justify-content-center align-items-center"
                                style={showRegister ? { marginLeft: "0%" } : { marginLeft: "500%" }}
                            >
                                <div className="w-75">
                                    <h1 className="fw-bold text-light text-center">Welcome Back!</h1>
                                    <p className="text-light text-center">Already have an account</p>
                                    <button className="btn btn-outline-light form-control w-100" onClick={() => setShowRegister(false)}>Login</button>
                                </div>
                            </div>
                        </div>
                        <div className="h-100 register w-100 d-flex bg-light" style={!showRegister ? { marginLeft: "0%" } : { marginLeft: "100%" }}>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6 left-oval d-flex justify-content-center align-items-center"
                                style={!showRegister ? { marginLeft: "0%" } : { marginLeft: "500%" }}
                            >
                                <div>
                                    <h1 className="fw-bold text-light text-center">Hello Welcome!</h1>
                                    <p className="text-light text-center">Dont have an account</p>
                                    <button className="btn btn-outline-light form-control" onClick={() => setShowRegister(true)}>Register</button>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6 bg-light d-flex justify-content-center align-items-center">
                                <div className="w-100">
                                    <h4 className="fw-bold text-center">Login</h4>
                                    <form className="p-3" onSubmit={submitlogin}>
                                        <input type="email" className="form-control bg-light mb-3" placeholder="email" name="email" />
                                        <input type="password" className="form-control bg-light mb-3" placeholder="password" name="password" />
                                        <button type="submit" className="btn btn-secondary form-control">Login</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}