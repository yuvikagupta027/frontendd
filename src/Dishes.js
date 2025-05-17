import { FaUser } from "react-icons/fa";
import Sidebaradmin from "./Sidebaradmin";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

export default function Dishes() {

    function adddishes(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var title = data.get("title");
        var desc = data.get("desc");
        var image = data.get("image");
        var price = data.get("price");

        axios.post("http://localhost:1000/adddishes", {
            Title: title,
            Desc: desc,
            Image: image,
            Price: price,
        }).then((succ) => {
            if (succ.data == "ok") {
                console.log("dish is added");
                e.target.reset();
                e.target.title.focus();
                fetchdishes();
            }
        })
    }

    const [dishes, setdishes] = useState([]);

    function fetchdishes() {
        axios.post("http://localhost:1000/fetchdishes").then((succ) => {
            setdishes(succ.data);
        })
    }

    useEffect(() => {
        fetchdishes();
    }, [])

    function deleteee(x) {
        axios.post("http://localhost:1000/deletedish", {
            Id: x
        }).then((succ) => {
            if (succ.data === "okk") {
                alert("Dish removed successfully");
                fetchdishes();
                // localStorage.removeItem("userlogin", succ.data._id)
            }
        });
    }
    return (
        <>
            <div className="d-flex vh-100 overflow-hidden">
                <div className="col-lg-2 bg-dark shadow vh-100 position-fixed" style={{ height: "100vh", zIndex: 1000 }}>
                    <Sidebaradmin />
                </div>
                <div className="bghomeadmin col-10 offset-2 col-lg-10">
                    <nav className="d-flex justify-content-end p-4">
                        <button className="btn btn-success text-light d-flex">
                            <FaUser />
                        </button>
                    </nav>
                    <div className="row m-0 justify-content-around align-items-center mt-lg-5">
                        <div className="col-lg-5 col-10 card p-0 cardddddd">
                            <form className="p-3" onSubmit={adddishes}>
                                <h5 className="fw-bold text-center">Add BestSellers</h5>
                                <input type="text" name="title" placeholder="Add title" className="form-control mb-2" />
                                <input type="text" name="desc" placeholder="Add description" className="form-control mb-2" />
                                <input type="url" name="image" placeholder="Add image" className="form-control mb-2" />
                                <input type="number" name="price" placeholder="Add price" className="form-control mb-2" />
                                <button type="submit" className="form-control mb-2 bg-success text-light">Add now</button>
                            </form>
                        </div>
                        <div className="col-lg-6 col-10 card p-0 cardddddd mt-2">
                            <div className="table-container">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <td className="fw-bold text-dark">Image</td>
                                            <td className="fw-bold text-dark">Title</td>
                                            <td className="fw-bold text-dark">Description</td>
                                            <td className="fw-bold text-dark">Price</td>
                                            <td className="fw-bold text-dark">Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dishes.map((row) => (
                                            <tr>
                                                <td className="w-25">
                                                    <img src={row.Image} className="img-fluid w-50" />
                                                </td>
                                                <td className="fw-bold text-dark">{row.Title}</td>
                                                <td className="fw-bold text-dark">{row.Desc}</td>
                                                <td className="fw-bold text-dark">₹{row.Price}</td>
                                                <td className="p-0">
                                                    <button className="text-danger btn" title="Delete" onClick={() => deleteee(row._id)}>
                                                        <MdDelete size={20} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}