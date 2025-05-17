import { FaUser } from "react-icons/fa";
import Sidebaradmin from "./Sidebaradmin";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

export default function Adminflavours() {

    const [flavour, setflavour] = useState([]);

    function submitflavours(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var flavour = data.get("flavour");
        var description = data.get("description");
        var image = data.get("image");
        // var price = data.get("price");

        axios.post("http://localhost:1000/submitflavours", {
            Flavour: flavour,
            Description: description,
            Image: image,
            // Price: price,
        }).then((succ) => {
            if (succ.data == "ok") {
                console.log("flavour is added");
                e.target.reset();
                e.target.flavour.focus();
                fetchflavours();
            }
        })
    }

    function fetchflavours() {
        axios.post("http://localhost:1000/fetchflavours").then((succ) => {
            setflavour(succ.data);
        })
    }

    useEffect(() => {
        fetchflavours();
    }, [])

    function deleteee(x) {
        axios.post("http://localhost:1000/deleteflavour", {
            Id: x
        }).then((succ) => {
            if (succ.data === "okk") {
                alert("Flavour removed successfully");
                fetchflavours();
            }
        });
    }
    return (
        <>
            <div className="d-flex vh-100 overflow-hidden">
                <div className="col-lg-2 bg-dark shadow vh-100 position-fixed" style={{ height: "100vh", zIndex: 1000 }}>
                    <Sidebaradmin />
                </div>
                <div className="bgadminflavour col-lg-10 col-10 offset-2">
                    <nav className="d-flex justify-content-end p-4">
                        <button className="btn btn-success text-light d-flex">
                            <FaUser />
                        </button>
                    </nav>
                    <div className="row m-0 justify-content-around align-items-center g-2">
                        <div className="col-lg-5 col-10 card p-0 mt-5 cardddddd">
                            <form className="p-3" onSubmit={submitflavours}>
                                <h5 className="fw-bold text-center">Add Flavours available</h5>
                                <input type="text" name="flavour" placeholder="Add Flavour" className="form-control mb-2" />
                                <input type="text" name="description" placeholder="Add description" className="form-control mb-2" />
                                <input type="url" name="image" placeholder="Add image" className="form-control mb-2" />
                                {/* <input type="number" name="price" placeholder="Add price" className="form-control mb-2" /> */}
                                <button type="submit" className="form-control mb-2 bg-success text-light">Add now</button>
                            </form>
                        </div>
                        <div className="col-lg-6 col-10 card p-0 cardddddd">
                            <div className="table-container">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <td className="fw-bold text-dark">Image</td>
                                            <td className="fw-bold text-dark">Name of Flavour</td>
                                            <td className="fw-bold text-dark">Description</td>
                                            {/* <td className="fw-bold text-dark">Price</td> */}
                                            <td className="fw-bold text-dark">Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {flavour.map((row) => (
                                            <tr>
                                                <td className="w-25">
                                                    <img src={row.Image} className="img-fluid w-50" />
                                                </td>
                                                <td className="fw-bold text-dark">{row.Flavour}</td>
                                                <td className="fw-bold text-dark">{row.Description}</td>
                                                {/* <td className="fw-bold text-dark">₹{row.Price}</td> */}
                                                <td className="p-0">
                                                    <button className="text-danger btn" title="Delete"
                                                        onClick={() => deleteee(row._id)}
                                                    >
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
            </div>
        </>
    )
}