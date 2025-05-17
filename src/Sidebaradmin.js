import { FaUser, FaUsers } from "react-icons/fa";
import { AiFillDashboard, AiFillProduct } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdCategory, MdLogout, MdShoppingBag } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";

export default function Sidebaradmin() {

    const [isOpen, setIsOpen] = useState(false);

    const [list, setlist] = useState([
        { link: "/Dashboard", icon: <AiFillDashboard size={20} />, name: "Dashboard" },
        // { link: "/Dishes", icon: <MdCategory size={20} />, name: "Bestsellers" },
        { link: "/Adminmenu", icon: <MdCategory size={20} />, name: "Menu" },
        { link: "/Adminflavours", icon: <AiFillProduct size={20} />, name: "Flavours" },
        { link: "/Adminusers", icon: <FaUsers size={20} />, name: "Users" },
        // { link: "/Adminaddress", icon: <MdShoppingBag size={20} />, name: "Users Address" },
        { link: "/Adminorders", icon: <MdShoppingBag size={20} />, name: "Orders" },
    ])

    var navi = useNavigate();
    var id = localStorage.getItem("adminlogin");

    function logouttt() {
        if (id) {
            localStorage.removeItem("adminlogin");
            navi("/Adminloginn")
        }
    }
    return (
        <>
            <button className="btn  text-light d-md-none m-2" onClick={() => setIsOpen(!isOpen)}>
                <IoMdMenu size={25} />
            </button>

            <div className=
                {
                    `bg-dark text-light vh-100 sidebar p-2
                ${isOpen ? "d-block" : "d-none"} 
                d-md-block`
                }
            >
                <div className="bg-secondary text-light text-center p-2 m-auto">
                    <h4 className="fw-bold textadmin">ADMIN PANEL</h4>
                </div>
                <hr className="text-light" />
                <nav>
                    <ul className="nav flex-column">
                        {list.map((row, index) => (
                            <li className="nav-item" key={index}>
                                <Link to={row.link} className="nav-link text-light">
                                    <div className="d-flex align-items-center">
                                        {row.icon}
                                        <span className="ms-3">{row.name}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                        <li className="nav-item mt-auto">
                            <button className="btn btn-danger mt-4 w-100 d-flex align-items-center justify-content-center" onClick={logouttt}>
                                <MdLogout />
                                <span className="ms-2">Logout</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}