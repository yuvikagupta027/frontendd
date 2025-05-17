import { useEffect, useState } from "react";
import Sidebaradmin from "./Sidebaradmin";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Adminaddress() {
    const [address, setaddress] = useState([]);

    const id = useState(localStorage.getItem("userlogin"))

    function fetchaddress() {
        axios.post("http://localhost:1000/fetchaddress", { id }).then((succ) => {
            setaddress(succ.data);
        })
    }
    useEffect(() => {
        fetchaddress();
    }, [])

    function deleteee(x) {
        axios.post("http://localhost:1000/deleteaddress", {
            Id: x
        }).then((succ) => {
            if (succ.data === "okk") {
                alert("User removed successfully");
                localStorage.removeItem("userlogin", succ.data._id)
                fetchaddress();
            }
        });
    }

    return (
        <>
            <div className="d-flex vh-100 overflow-hidden">
                <div className="col-lg-2 bg-dark shadow vh-100 position-fixed" style={{ height: "100vh", zIndex: 1000 }}>
                    <Sidebaradmin />
                </div>
                <div className="col-lg-10 col-10 offset-2">
                    <nav className="d-flex justify-content-end p-4">
                        <button className="btn btn-success text-light d-flex">
                            <FaUser />
                        </button>
                    </nav>
                    <div className="p-2 col-lg-10 col-10 mx-auto">
                        <div className="table-container">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <td className="fw-bold">#</td>
                                        <td className="fw-bold">First Name</td>
                                        <td className="fw-bold">Last Name</td>
                                        <td className="fw-bold">Email</td>
                                        <td className="fw-bold">Address</td>
                                        <td className="fw-bold">Contact</td>
                                        <td className="fw-bold">Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {address.map((row, index) => (
                                        <tr>
                                            <td className="text-dark">{index + 1}</td>
                                            <td className="text-dark">{row.Firstname}</td>
                                            <td className="text-dark">{row.Lastname}</td>
                                            <td className="text-dark">{row.Email}</td>
                                            <td className="text-dark">{row.Line1}, {row.Line2}, {row.City}, {row.State}, {row.Country}, {row.Postalcode}</td>
                                            <td className="text-dark">{row.Contact}</td>
                                            <td className="p-0 mt-2">
                                                <button className="text-danger btn" title="Delete" onClick={() => deleteee(row._id)}>
                                                    <MdDelete size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {address.length == 0 && (
                                        <tr>
                                            <td colSpan="5" className="text-center text-secondary">No Address Found of registered users</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}