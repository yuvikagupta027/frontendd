import { FaEye, FaUser } from "react-icons/fa";
import Sidebaradmin from "./Sidebaradmin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdDelete } from "react-icons/md";

export default function Adminorders() {

    const [cartt, setcartt] = useState([]);
    // const [cartItems, setcartItems] = useState([]);
    const userId = localStorage.getItem('userlogin');
    var navi = useNavigate();

    function fetchcart() {
        axios.post("https://backend-6-r5ox.onrender.com/fetchorders", { id: userId })
            .then((res) => {
                setcartt(res.data);
                // setcartItems(res.data);
                console.log(res.data, "helloo");
            })
            .catch((err) => console.error("Error fetching cart:", err));
    }

    useEffect(() => {
        fetchcart();
    }, [userId]);

    function deleteee(x) {
        axios.post("https://backend-6-r5ox.onrender.com/deleteorders", {
            Id: x
        }).then((succ) => {
            if (succ.data === "okk") {
                alert("Order removed successfully");
                fetchcart();
            }
        });
    }

    function markAsDelivered(orderId) {
        if (window.confirm("Mark this order as Delivered?")) {
            axios.post("https://backend-6-r5ox.onrender.com/deliverorder", { id: orderId })
                .then((succ) => {
                    if (succ.data === "ok") {
                        alert("Order marked as Delivered!");
                        fetchcart();
                    } else {
                        alert("Failed to update order status.");
                    }
                })
        }
    }

    const [totalam, settotalam] = useState(0);
    const shipping = 20;
    const grandTotal = totalam + shipping;

    function calculate() {
        let newTotal = 0;
        for (let i = 0; i < cartt.length; i++) {
            const order = cartt[i];
            if (order.status === "Delivered" && Array.isArray(order.cartItems)) {
                order.cartItems.forEach((item) => {
                    const qty = parseFloat(item.CartValue) || 0;
                    const price = parseFloat(item.Price) || 0;
                    newTotal += qty * price;
                });
                newTotal += 20; // Add shipping for delivered orders only
            }
        }
        settotalam(newTotal);
        console.log("Filtered Total Amount:", newTotal);
    }
    

    useEffect(() => {
        calculate();
    }, [cartt]);


    return (
        <>
            <div className="row m-0 vh-100 overflow-hidden">
                <div className="col-lg-2 bg-dark shadow vh-100 position-fixed" style={{ height: "100vh", zIndex: 1000 }}>
                    <Sidebaradmin />
                </div>
                <div className="col-lg-10 col-10 offset-2">
                    <nav className="d-flex justify-content-end p-4">
                        <button className="btn btn-success text-light d-flex">
                            <FaUser />
                        </button>
                    </nav>
                    <div className="col-lg-10 col-11 card p-0 m-auto">
                        <div className="table-container">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <td className="fw-bold text-dark">#</td>
                                        <td className="fw-bold text-dark">Email</td>
                                        <td className="fw-bold text-dark">Address</td>
                                        <td className="fw-bold text-dark">Orders</td>
                                        <td className="fw-bold text-dark">Date</td>
                                        <td className="fw-bold text-dark">Status</td>
                                        <td className="fw-bold text-dark">Price</td>
                                        <td className="fw-bold text-dark">Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartt.map((row, index) => (
                                        <tr key={row._id}>
                                            <td className="fw-bold text-dark">{index + 1}</td>
                                            <td className="fw-bold text-dark">{row.address?.Email}</td>
                                            <td className="fw-bold text-dark">{row.address?.Line1}, {row.address?.Line2}, {row.address?.City}, {row.address?.State}, {row.address?.Country} </td>
                                            <td className="fw-bold text-dark">
                                                <button onClick={() => navi(`/Adminorderdetails?id=${row._id}`)} className="btn btn-primary btn-sm" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                                                    <FaEye />
                                                </button>
                                            </td>
                                            <td className="fw-bold text-dark">{row.orderDate}</td>
                                            <td>
                                                {row.status === "Delivered" ? (
                                                    <button className="btn btn-success">Delivered</button>
                                                ) : (
                                                    <button onClick={() => markAsDelivered(row._id)} className="btn btn-warning">
                                                        Pending
                                                    </button>
                                                )}
                                            </td>
                                            <td>
                                                ₹{(
                                                    (row.cartItems || []).reduce((sum, item) => {
                                                        const qty = parseFloat(item.CartValue) || 0;
                                                        const price = parseFloat(item.Price) || 0;
                                                        return sum + qty * price;
                                                    }, 0) + 20
                                                ).toFixed(2)}
                                            </td>
                                            <td className="p-0">
                                                <button className="text-danger btn" title="Delete" onClick={() => deleteee(row._id)}>
                                                    <MdDelete size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {cartt.length === 0 && (
                                        <tr>
                                            <td colSpan="7" className="text-center">No orders found.</td>
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot >
                                    <td colSpan="8">
                                        <div>
                                            <div className="d-flex justify-content-between px-3">
                                                <h6 className="fw-bold">Total Delivered Price</h6>
                                                <h6>₹{totalam.toFixed(2)}</h6>
                                            </div>
                                        </div>
                                    </td>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}