import axios from "axios";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Bestsellers() {
    const [dishes, setdishes] = useState([]);
    const [seldishes, setseldishes] = useState(0);

    function fetchdishes() {
        axios.post("http://localhost:1000/fetchdishes").then((succ) => {
            setdishes(succ.data);
        })
    }

    useEffect(() => {
        fetchdishes();
    }, [])

    const previous = () => {
        if (seldishes > 0) {
            setseldishes(() => seldishes - 1);
        }
    };

    const next = () => {
        if (dishes.length - 1 > seldishes) {
            setseldishes(() => seldishes + 1);
        }
    };

    const reorderedDishes = [
        ...dishes.slice(seldishes),
        ...dishes.slice(0, seldishes)
    ];

    const [isPaused, setIsPaused] = useState(false);

    const handleDishClick = (index) => {
        setseldishes((seldishes + index) % dishes.length);
        setIsPaused(true);
        setTimeout(() => {
            setIsPaused(false);
        }, 2000); // 2 seconds pause
    };

    return (
        <div className="scroll-wrapper menu-slider-container text-white d-flex wrap align-items-center"
            style={{
                backgroundImage: `url(${dishes.length > 0 ? dishes[seldishes].Image : ""})`,
                backgroundSize: "30% auto",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
            }}
        >
            <div className="overlay"></div>
            <div className="left-text col-md-4 px-lg-5 slide-in">
                <h1 className="display-4 fw-bold">{dishes[seldishes]?.Title?.toUpperCase()}</h1>
                <p className="lead">{dishes[seldishes]?.Desc}</p>
                <p>Price- ₹ {dishes[seldishes]?.Price}</p>
                <Link to={"/Menu"}>
                    <button className="btn btn-light">
                        Explore Menu
                    </button>
                </Link>
            </div>

            <div className="slider-wrapper-container col-md-8 px-lg-4 my-auto slider-wrapper d-flex overflow-hidden">
                <div className="scroll-track d-flex">
                    <div className={`scroll-track d-flex ${isPaused ? "paused" : ""}`}>
                        {[...reorderedDishes, ...reorderedDishes].map((row, index) => (
                            <div
                                className="card-item carditem mx-2"
                                style={{
                                    maxWidth: "180px",
                                    maxHeight: "190px",
                                    cursor: "pointer",
                                    transform: index === 0 ? "scale(1.1)" : "scale(1)",
                                    transition: "transform 0.2s ease",
                                }}
                                onClick={() => handleDishClick(index)}
                            >
                                <img
                                    src={row.Image}
                                    className="img-fluid rounded menuimg my-2"
                                    alt={row.Title}
                                />
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            <div className="navigation-buttons position-absolute justify-content-center align-items-center">
                <button className="btn btn-light me-2" onClick={previous}>
                    <FaChevronLeft />
                </button>
                <button className="btn btn-light" onClick={next}>
                    <FaChevronRight />
                </button>
            </div>
        </div >
    );
}