import { FaUser } from "react-icons/fa";
import Sidebaradmin from "./Sidebaradmin";

export default function Category() {
    return (
        <>
            <div className="d-flex">
                <div className="col-lg-2 bg-dark vh-100 position-sticky shadow">
                    <Sidebaradmin />
                </div>
                <div className="bghomeadmin col-lg-10">
                    <nav className="bg-light shadow d-flex justify-content-end p-2">
                        <button className="btn text-dark">
                            <FaUser />
                        </button>
                    </nav>
                    <div className="d-flex justify-content-around align-items-center mt-5">
                        <div className="col-lg-5 card p-0 mt-5">
                            <form className="p-3">
                                <h5 className="fw-bold text-center">Add Dishes in Menu</h5>
                                <input type="text" name="title" placeholder="Add title" className="form-control mb-2" />
                                <input type="text" name="desc" placeholder="Add description" className="form-control mb-2" />
                                <input type="url" name="image" placeholder="Add image" className="form-control mb-2" />
                                <input type="number" name="price" placeholder="Add price" className="form-control mb-2" />
                                <button type="submit" className="form-control mb-2 bg-success text-light">Add now</button>
                            </form>
                        </div>
                        <div className="col-lg-3 card p-0 mt-5">
                            <div className="card-body">
                                <img src="https://t4.ftcdn.net/jpg/01/43/42/83/360_F_143428338_gcxw3Jcd0tJpkvvb53pfEztwtU9sxsgT.jpg" className="img-fluid" />
                            </div>
                            <div className="card-footer">
                                <p>Title</p>
                                <p>description</p>
                                <p>price- rs.200</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}