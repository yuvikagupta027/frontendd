import { FaUser } from "react-icons/fa";
import Sidebaradmin from "./Sidebaradmin";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Adminusers() {

    const [users, setusers] = useState([]);

    const userId = useState(localStorage.getItem("userlogin"))

    function fetchusers() {
        if (userId) {
            axios.post("https://backend-6-r5ox.onrender.com/fetchusers", {
                Id: userId
            }).then((succ) => {
                setusers(succ.data);
                console.log("users fetched", succ.data);
            })
        }
    }

    useEffect(() => {
        fetchusers();
    }, [userId])

    function deleteee(x) {
        axios.post("https://backend-6-r5ox.onrender.com/deleteuser", {
            Id: x
        }).then((succ) => {
            if (succ.data === "okk") {
                alert("User removed successfully");
                localStorage.removeItem("userlogin", succ.data._id)
                fetchusers();
            }
        });
    }
    return (
        <>
            <div className="d-flex vh-100 overflow-hidden">
                <div className="col-lg-2 bg-dark shadow vh-100 position-fixed" style={{ height: "100vh", zIndex: 1000 }}>
                    <Sidebaradmin />
                </div>
                <div className="col-lg-10 col-10 offset-2 bgadminusers">
                    <nav className="d-flex justify-content-end p-4">
                        <button className="btn btn-success text-light d-flex">
                            <FaUser />
                        </button>
                    </nav>
                    <div className="p-2 col-lg-10 mx-auto">
                        <div className="table-container">
                            <table className="table table-striped tablehtt">
                                <thead>
                                    <tr>
                                        <td className="fw-bold">#</td>
                                        <td className="fw-bold">Username</td>
                                        <td className="fw-bold">Email</td>
                                        <td className="fw-bold">Password</td>
                                        <td className="fw-bold">Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((row, index) => (
                                        <tr>
                                            <td className="text-dark">{index + 1}</td>
                                            <td className="text-dark">{row.Username}</td>
                                            <td className="text-dark">{row.Email}</td>
                                            <td className="text-dark">{row.Password}</td>
                                            <td className="p-0 mt-2">
                                                <button className="text-danger btn" title="Delete" onClick={() => deleteee(row._id)}>
                                                    <MdDelete size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {users.length == 0 && (
                                        <tr>
                                            <td colSpan="5" className="text-center text-secondary">No Users Found</td>
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