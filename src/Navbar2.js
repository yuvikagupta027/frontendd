import { FaMinus, FaPlus, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete, MdLogout } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Navbar2() {
    const [dishes, setdishes] = useState([]);
    const [cartt, setcartt] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [totalam, settotalam] = useState(0);
    const shipping = 20;
    const grandTotal = totalam + shipping;

    const id = localStorage.getItem("userlogin");
    const navi = useNavigate();

    function logoutt() {
        if (id) {
            localStorage.removeItem("userlogin");
            alert("User Logged Out");
            navi("/");
        }
    }

    function fetchcart() {
        axios.post("https://backend-6-r5ox.onrender.com/fetchcart", { id })
            .then((succ) => setcartt(succ.data))
            .catch((err) => console.error("Error fetching cart:", err));
    }

    function fetchdishes() {
        axios.post("https://backend-6-r5ox.onrender.com/fetchmenu")
            .then((succ) => setdishes(succ.data))
            .catch((err) => console.error("Error fetching menu:", err));
    }

    useEffect(() => {
        fetchcart();
        fetchdishes();
    }, []);

    function addtocart(row) {
        const userId = localStorage.getItem('userlogin');
        const { _id, ...rest } = row;
        const cartItem = { ...rest, CartValue: 1, userId };
        axios.post("https://backend-6-r5ox.onrender.com/addtocart", cartItem)
            .then(() => fetchcart())
            .catch((err) => console.error("Error adding to cart:", err));
    }

    function incre(id) {
        axios.post("https://backend-6-r5ox.onrender.com/increasecart", { _id: id }).then(() => fetchcart());
    }

    function decre(id) {
        axios.post("https://backend-6-r5ox.onrender.com/decreasecart", { _id: id }).then(() => fetchcart());
    }

    function deletee(x) {
        axios.post("https://backend-6-r5ox.onrender.com/deleteitem", { Id: x })
            .then((succ) => {
                if (succ.data === "ok") {
                    alert("Item deleted successfully");
                    fetchcart();
                }
            });
    }

    function calculate() {
        let newTotal = 0;
        for (let item of cartt) {
            newTotal += item.CartValue * item.Price;
        }
        settotalam(newTotal);
    }

    useEffect(() => {
        calculate();
    }, [cartt]);

    function handleContinue() {
        setIsCartOpen(false);
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
                                <Link to="/">
                                    <li className="nav-item ms-3 me-3 text-light btn btn-custom">Home</li>
                                </Link>
                                <Link to="/Menu">
                                    <li className="nav-item ms-3 me-3 text-light btn btn-custom">Menu</li>
                                </Link>
                                <Link to="/Contact">
                                    <li className="nav-item ms-3 me-3 text-light btn btn-custom">Contact</li>
                                </Link>
                            </>
                        </ul>
                        <div className="dropdown me-3 p-0 m-0">
                            <button className="btn bg-dark text-light" data-bs-toggle="dropdown">
                                <FaUser />
                            </button>
                            {id && (
                                <button className="btn bg-dark text-light" onClick={() => setIsCartOpen(true)}>
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

            {isCartOpen && (
                <div className="custom-cart-sidebar bg-dark text-light position-fixed top-0 end-0 h-100 p-3 shadow" style={{ width: '350px', zIndex: 1050 }}>
                    <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                        <h5>Shopping Cart</h5>
                        <button className="btn btn-sm btn-light" onClick={() => setIsCartOpen(false)}>X</button>
                    </div>

                    <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                        {cartt.map((row) => (
                            <div key={row._id} className="mb-3 border-bottom pb-2">
                                <div className="d-flex align-items-center">
                                    <img src={row.Image} alt={row.Title} style={{ width: 60, height: 60, objectFit: 'cover' }} className="me-2" />
                                    <div className="flex-grow-1">
                                        <h6 className="m-0">{row.Title}</h6>
                                        <p className="m-0">₹{row.Price}</p>
                                        <div className="btn-group mt-1">
                                            <button className="btn btn-sm btn-outline-warning" disabled={row.CartValue <= 1} onClick={() => decre(row._id)}>
                                                <FaMinus />
                                            </button>
                                            <button className="btn btn-sm btn-light" disabled>{row.CartValue}</button>
                                            <button className="btn btn-sm btn-outline-warning" onClick={() => incre(row._id)}>
                                                <FaPlus />
                                            </button>
                                        </div>
                                        <button className="btn btn-sm text-danger float-end" onClick={() => deletee(row._id)}>
                                            <MdDelete />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-1 border border-2 p-2 table-responsive">
                        <table className="table table-dark">
                            <tbody>
                                <tr>
                                    <td>Total</td>
                                    <td align="right">₹{totalam.toFixed(2)}</td>
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
            )}
        </>
    );
}
