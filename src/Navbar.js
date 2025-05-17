import { FaShoppingCart, FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Link, Links, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
    const loc = useLocation();

    var id = localStorage.getItem("userlogin");
    var navi = useNavigate();

    function logoutt() {
        if (id) {
            localStorage.removeItem("userlogin");
            navi("/")
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-3 m-0 p-0 shadow">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="https://png.pngtree.com/png-vector/20250217/ourmid/pngtree-chai-is-life-png-image_15498076.png" style={{ width: "100px", objectFit: "contain" }} />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                        <ul className="navbar-nav mx-auto text-center">
                            {loc.pathname === "/Home" ? (
                                <>
                                    <li className="nav-item ms-3 me-3"><a className="nav-link text-light btn btn-custom" href="#home">Home</a></li>
                                    <li className="nav-item ms-3 me-3"><a className="nav-link text-light btn btn-custom" href="#bestsellers">BestSellers</a></li>
                                    <li className="nav-item ms-3 me-3"><a className="nav-link text-light btn btn-custom" href="#flavours">Flavours</a></li>
                                    {/* <li className="nav-item ms-3 me-3"><a className="nav-link text-light btn btn-custom" href="#contact">Contact</a></li> */}
                                </>
                            ) : (
                                <>
                                    <li className="nav-item ms-3 me-3"><Link to="/#home" className="nav-link text-light btn btn-custom">Home</Link></li>
                                    <li className="nav-item ms-3 me-3"><Link to="/#bestsellers" className="nav-link text-light btn btn-custom">BestSellers</Link></li>
                                    <li className="nav-item ms-3 me-3"><Link to="/#flavours" className="nav-link text-light btn btn-custom">Flavours</Link></li>
                                    {/* <li className="nav-item ms-3 me-3"><Link to="/#contact" className="nav-link text-light btn btn-custom">Contact</Link></li>  */}
                                </>
                            )}
                        </ul>
                        <div className="navbar-nav d-flex align-items-center gap-3">
                            <button className='btn bg-dark text-light'>
                                <Link to={"/Profile"} className="text-decoration-none text-light" >
                                    <FaUser />
                                </Link>
                            </button>
                            <button className="btn bg-dark text-light" data-bs-toggle="offcanvas" data-bs-target="#myoff" >
                                <FaShoppingCart />
                            </button>
                            <button className="btn bg-dark text-light" onClick={logoutt}>
                                <MdLogout />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="offcanvas offcanvas-end bg-dark" id="myoff">
                <div class="offcanvas-content">
                    <div className="offcanvas-header bg-light">
                        <h4 className="text-dark">Shopping Cart</h4>
                        <button data-bs-dismiss="offcanvas" className="btn-close"></button>
                    </div>
                    <div className="offcanvas-body bg-dark text-light">

                    </div>
                    <div class="offcanvas-footer text-light">
                        <div className="mt-3 border border-2">
                            <div className="d-flex justify-content-between px-3">
                                <h6 className="fw-bold">Total</h6>
                                <h6>$60</h6>
                            </div>
                            <div className="d-flex justify-content-between px-3">
                                <h6 className="fw-bold">Shipping Charges</h6>
                                <h6>$60</h6>
                            </div>
                            <div className="d-flex justify-content-between px-3">
                                <h6 className="fw-bold">Grand Total</h6>
                                <h6>$60</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
