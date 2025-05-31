import { FaShoppingBag, FaUser } from "react-icons/fa";
import Sidebaradmin from "./Sidebaradmin";
import { useEffect, useState } from "react";
import { MdCategory } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import axios from "axios";

export default function Dashboard() {

    const [cardss, setcardss] = useState([
        { CLR: "bg-danger", number: "", name: "User Registrations", icons: <FaUser size={55} /> },
        { CLR: "bg-info", number: "", name: "Total no. of Bestsellers", icons: <MdCategory size={55} /> },
        { CLR: "bg-warning", number: "", name: "Dishes Available", icons: <AiFillProduct size={55} /> },
        { CLR: "bg-success", number: "", name: "Total no. of Flavours", icons: <FaShoppingBag size={55} /> },

    ])

    // const [users, setusers] = useState([]);

    const userId = useState(localStorage.getItem("userlogin"))

    function fetchusers() {
        if (userId) {
            axios.post("https://backend-6-r5ox.onrender.com/fetchusers", {
                Id: userId
            }).then((succ) => {
                // setusers(succ.data);
                // console.log(succ.data.length);
                cardss[0].number = succ.data.length;
                setcardss([...cardss]);
            })
        }
    }

    useEffect(() => {
        fetchusers();
    }, [userId])

    function fetchdishes() {
        axios.post("https://backend-6-r5ox.onrender.com/fetchmenu").then((succ) => {
            cardss[2].number = succ.data.length;
            setcardss([...cardss]);
        })
    }

    useEffect(() => {
        fetchdishes();
    }, [])


    function fetchbestsellers() {
        axios.post("https://backend-6-r5ox.onrender.com/fetchdishes").then((succ) => {
            cardss[1].number = succ.data.length;
            setcardss([...cardss]);
        })
    }

    useEffect(() => {
        fetchbestsellers();
    }, [])

    function fetchflavours() {
        axios.post("https://backend-6-r5ox.onrender.com/fetchflavours").then((succ) => {
            // setflavour(succ.data);
            cardss[3].number = succ.data.length;
            setcardss([...cardss]);
        })
    }

    useEffect(() => {
        fetchflavours();
    }, [])

    return (
        <>
            <div className="d-flex flex-lg-row">
                <div className="col-lg-2 bg-dark vh-100 position-fixed shadow" style={{height: "100vh", zIndex: 1000 }}>
                    <Sidebaradmin />
                </div>
                <div className="col-lg-10 col-10 offset-2">
                    <nav className="bg-light shadow d-flex justify-content-end p-2">
                        <button className="btn text-dark">
                            <FaUser />
                        </button>
                    </nav>
                    <div className="p-2 row m-0">
                        {cardss.map((row) => (
                            <div className="col-lg-3 col-11 mb-2">
                                <div className={"card " + row.CLR}>
                                    <div className={"card-body"}>
                                        <div className="d-flex">
                                            <div>
                                                <h1 className="text-light">{row.number}</h1>
                                                <h4 className="text-light">{row.name}</h4>
                                            </div>
                                            <button className="text-light btn float-end">
                                                {row.icons}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}