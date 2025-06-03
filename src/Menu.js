import Navbar2 from "./Navbar2";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import { CircularProgress, Snackbar } from "@mui/material";
import { MdDelete, MdLogout } from "react-icons/md";
import { FaMinus, FaPlus, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Offcanvas } from "bootstrap/dist/js/bootstrap.bundle";

export default function Menu() {

    const [dishes, setdishes] = useState([]);
    const [cartt, setcartt] = useState([]);

    const [opn, setopn] = useState(false);
    const [lod, setlod] = useState(false);

    function fetchdishes() {
        axios.post("http://localhost:1000/fetchmenu")
            .then((succ) => setdishes(succ.data))
            .catch((err) => ("Error fetching menu", err));
    }

    function addtocart(row) {
        setlod(true)
        var userId = localStorage.getItem('userlogin');
        const { _id, ...rest } = row;
        const cartItem = {
            ...rest,
            CartValue: 1,
            userId: userId,
        };

        axios.post("http://localhost:1000/addtocart", cartItem).then((succ) => {
            if (succ.data == "ok") {
                alert("item added successfully");
                fetchcart();
                setopn(true);
                setlod(false)
                deletee();
            }
        }).catch((err) => {
            console.error("Error adding to cart:", err)
            setlod(false)
        });

    }

    const [pro, setpro] = useState([]);

    function fetchcart() {
        const userId = localStorage.getItem('userlogin');
        axios.post("http://localhost:1000/fetchcart", { id: userId }).then((succ) => {
            setcartt(succ.data);
            var ar = [];
            for (let i = 0; i < succ.data.length; i++) {
                // const users = array[i];
                // console.log(succ.data.userId);
                ar.push(succ.data[i].Title);
            }
            setpro(ar);
            // console.log("Cart updated:", succ.data);
        }).catch((err) => console.error("Error fetching cart:", err));
    }

    useEffect(() => {
        fetchcart();
        fetchdishes();
    }, [])

    function deletee(x) {
        axios.post("http://localhost:1000/deleteitem", {
            Id: x
        }).then((succ) => {
            if (succ.data == "ok") {
                // alert("item deleted successfully");
                fetchcart();
            }
        })
    }

    function incre(id) {
        axios.post("http://localhost:1000/increasecart", { _id: id }).then((succ) => {
            fetchcart();
        })
    }
    function decre(id) {
        axios.post("http://localhost:1000/decreasecart", { _id: id }).then((succ) => {
            fetchcart();
        })
    }

    function logoutt() {
        if (id) {
            localStorage.removeItem("userlogin");
            navi("/")
        }
    }

    var id = localStorage.getItem("userlogin");
    var navi = useNavigate();

    const [total, settotalam] = useState(0);
    const shipping = 20;
    const grandTotal = total + shipping;

    function calculate() {
        let newTotal = 0;
        for (let i = 0; i < cartt.length; i++) {
            const item = cartt[i];
            newTotal += item.CartValue * item.Price;
        }
        settotalam(newTotal);
        console.log(newTotal);
    }
    useEffect(() => {
        calculate();
    }, [cartt]);

    function handleContinue() {
        const offcanvasElement = document.getElementById('myoff');
        const offcanvasInstance = Offcanvas.getInstance(offcanvasElement);
        if (offcanvasInstance) {
            offcanvasInstance.hide();
        }
        navi("/Billingaddress");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-3 m-0 p-0 shadow">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="https://png.pngtree.com/png-vector/20250217/ourmid/pngtree-chai-is-life-png-image_15498076.png" className="img-fluid" style={{ width: "100px", objectFit: "contain" }} />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                        <ul className="navbar-nav mx-auto text-center">
                            <>
                                <Link to={"/"}>
                                    <li className="nav-item ms-3 me-3 text-light btn btn-custom">Home</li>
                                </Link>
                                <Link to={"/Menu"}>
                                    <li className="nav-item ms-3 me-3 text-light btn btn-custom">Menu</li>
                                </Link>
                                <Link to={"/Contact"}>
                                    <li className="nav-item ms-3 me-3 text-light btn btn-custom">Contact</li>
                                </Link>
                            </>
                        </ul>
                        <div className="dropdown me-3 p-0 m-0">
                            <button className="btn bg-dark text-light" data-bs-toggle="dropdown">
                                <FaUser />
                            </button>
                            {id && (
                                <button className="btn bg-dark text-light" data-bs-toggle="offcanvas" data-bs-target="#myoff" >
                                    <FaShoppingCart />
                                </button>
                            )}
                            {id && (
                                <button className="btn bg-dark text-light" onClick={logoutt}>
                                    <MdLogout />
                                </button>
                            )}
                            <ul className="dropdown-menu">
                                {!id && (
                                    <li className="dropdown-item bg-light">
                                        <Link to="/Login" className="text-decoration-none text-dark">
                                            Login
                                        </Link>
                                    </li>
                                )}
                                {id && (
                                    <li className="dropdown-item bg-light">
                                        <Link to="/Orders" className="text-decoration-none text-dark">
                                            Your Past Orders
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="offcanvas offcanvas-end bg-dark" id="myoff">
                <div className="offcanvas-header bg-light">
                    <h4 className="text-dark">Shopping Cart</h4>
                    <button data-bs-dismiss="offcanvas" className="btn-close"></button>
                </div>
                <div className="offcanvas-body text-light ">
                    <div className="">
                        {cartt.map((row) => (
                            <div className="mt-1 border border-2">
                                <div className="d-flex justify-content-between align-items-center p-2">
                                    <img
                                        src={row.Image}
                                        className="img-fluid rounded me-3"
                                        style={{ width: "70px", height: "auto" }}
                                    />
                                    {/* <div className="float-end ms-2"> */}
                                    <div className="w-75">
                                        <h6 className="text-capitalize">{row.Title}</h6>
                                        <h6 className="text-capitalize">price - ₹{row.Price}</h6>
                                        <span className="btn-group">
                                            <button disabled={row.CartValue <= 1} className="btn btn-sm btn-outline-warning" onClick={() => {
                                                if (row.CartValue > 1) {
                                                    decre(row._id);
                                                } else {
                                                    // optionally remove item or show a message
                                                }
                                            }}>
                                                <FaMinus size={15} />
                                            </button>
                                            <button className="btn btn-sm btn-light" disabled>
                                                {row.CartValue}
                                            </button>
                                            <button className="btn btn-sm btn-outline-warning" onClick={() => incre(row._id)}>
                                                <FaPlus size={15} />
                                            </button>
                                        </span>
                                        <button className="btn text-warning float-end" onClick={() => deletee(row._id)}>
                                            <MdDelete size={15} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div class="offcanvas-footer text-light position-sticky">
                    <div className="mt-1 border border-2 p-2 table-responsive">
                        <table className="table table-dark">
                            <tbody>
                                <tr>
                                    <td>Total</td>
                                    <td align="right">₹{total.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Shipping</td>
                                    <td align="right">₹{shipping.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Grand Total</td>
                                    <td align="right">₹{grandTotal.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="">
                            <button className="btn btn-success w-100" onClick={handleContinue}>
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-dark pt-5 justify-content-around align-items-center d-flex flex-wrap mt-5">
                {dishes.map((row) => (
                    <>
                        <div className="col-lg-5 col-10">
                            <div className="card bg-dark cardd border border-2 text-light mb-3">
                                <div className="row m-0 align-items-center">
                                    <div className="col-md-6 col-7">
                                        <h4 className="fw-bold text-uppercase mt-1">{row.Title}</h4>
                                        <p className="lead">{row.Desc}</p>
                                        <p>Price - ₹{row.Price}</p>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-5 text-center">
                                        <img src={row.Image} className="img-fluid menudishimg rounded m-auto" />
                                    </div>
                                </div>
                                <div className="w-100 m-auto text-center">
                                    {lod ? (
                                        <CircularProgress color="warning" />
                                    ) : (
                                        pro && pro.indexOf(row.Title) >= 0 ? (
                                            <button className="btn btn-light mb-3">Already in cart</button>
                                        ) : (
                                            <button className="btn btn-warning mb-3" onClick={() => addtocart(row)}>
                                                Add To Cart
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div >
            <Snackbar autoHideDuration={2000} open={opn} onClose={() => setopn(false)} message="Added to Cart" />
            <div className="row m-0 mt-0 bg-dark align-items-center justify-content-center d-flex flex-wrap p-0">
                <Footer />
            </div>
        </>
    );
}