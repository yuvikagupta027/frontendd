import axios from "axios";
import { useEffect, useState } from "react";

export default function Flavours() {
    const [flavour, setflavour] = useState([]);

    function fetchflavours() {
        axios.post("http://localhost:1000/fetchflavours").then((succ) => {
            setflavour(succ.data);
        });
    }

    useEffect(() => {
        fetchflavours();
    }, []);

    return (
        <>
            {/* <h3 className="bg-dark mt-5 display-6 text-center fw-bold text-light">
                Flavours Available
            </h3>
            <div className="overflow-hidden py-5 mb-3 mt-3">
                <div className="d-flex">
                    {flavour.map((row) => (
                        <div className="col-lg-2 col-5 d-flex flex-wrap card bg-dark text-white shadow-lg border-0 mx-2"
                            // style={{ minWidth: "250px", transform: "rotateY(-10deg) scale(0.95)", transition: "transform 0.3s"}}
                            >
                            <img src={row.Image} className="img-fluid w-100 my-auto" 
                            // style={{ height: "200px", width: "250px", margin: "auto" }} 
                            />
                            <div className="card-footer">
                                <h5 className="bg-dark text-light">{row.Name}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
            <h3 className="bg-dark mt-5 display-6 text-center fw-bold text-light">
                Flavours Available
            </h3>
            <div className="overflow-hidden py-3 mb-3 mt-2">
                <div className="d-flex flex-wrap justify-content-center gap-3">
                    {flavour.map((row) => (
                        <div className="card col-lg-2 col-5 bg-dark shadow-lg border-0 mx-2"
                        // style={{ width: "150px", minWidth: "45%", maxWidth: "180px" }} // adjusts on small screens
                        >
                            <img
                                src={row.Image}
                                className="img-fluid w-100 my-auto"
                            // style={{ height: "150px", objectFit: "cover" }}
                            // alt={row.Name}
                            />
                            <div className="card-footer text-center">
                                <h6 className="bg-dark text-light m-0">{row.Name}</h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
