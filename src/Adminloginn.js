import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Adminloginn() {

    var navi = useNavigate();

    function loginadmin(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var email = data.get("email");
        var password = data.get("password");

        axios.post("http://localhost:1000/loginadmin", {
            Email: email,
            Password: password,
        }).then((succ) => {
            console.log(succ.data);

            if (succ.data && succ.data._id) {
                // Successful login
                localStorage.setItem("adminlogin", succ.data._id);
                navi("/Dashboard");
            } else {
                // Wrong credentials
                alert("Wrong credentials. Please try again.");
            }
        })
    }


    const [id, setid] = useState(localStorage.getItem("adminlogin"));

    function checkuser() {
        if (id) {
            axios.post("http://localhost:1000/adminlogincheck", { Id: id })
                .then((response) => {
                    if (response.data) {
                        navi("/Dashboard");
                    }
                })
                .catch((error) => {
                    console.error("Check user error:", error);
                });
        }
    }

    useEffect(() => {
        setTimeout(() => {
            checkuser();
        }, 500);
    }, [id])

    return (
        <>
            <div className="row m-0 justify-content-center align-items-center vh-100 p-2 backgrounddddd">
                <div className="col-lg-4 card cardddddd p-0">
                    <div>
                        <div className="p-3">
                            <h5 className="fw-bold text-center text-dark">Login</h5>
                            <form onSubmit={loginadmin}>
                                <input type="email" placeholder="Email" name="email" className="form-control mb-2 mt-2" />
                                <input type="password" placeholder="Password" name="password" className="form-control mb-2 mt-2" />
                                <button type="submit" className="mb-4 form-control text-light" style={{ backgroundColor: "#D58507" }}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}