import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import Bestsellers from "./Bestsellers";
import Footer from "./Footer";
import Flavours from "./Flavours";
import Navbar2 from "./Navbar2";
import { Link } from "react-router-dom";

export default function Home() {

    const [index, setindex] = useState(0);
    const [animate1, setAnimate1] = useState(0);
    const [animate2, setAnimate2] = useState(1);
    const [animate3, setAnimate3] = useState(2);

    const images = [
        "https://www.transparentpng.com/thumb/green-tea/c5RY1w-green-tea-clipart-hd.png",
        "https://www.cafezaar.com/assets/images/1.png",
        "https://pngimg.com/d/mug_coffee_PNG97397.png"
    ]

    const previous = () => {
        if (animate1 == 0) {
            setAnimate1(2)
            setAnimate2(0)
            setAnimate3(1)
        } else if (animate1 == 1) {
            setAnimate1(0)
            setAnimate2(1)
            setAnimate3(2)
        } else {
            setAnimate1(1)
            setAnimate2(2)
            setAnimate3(0)
        }
    }

    const next = () => {
        if (animate1 == 0) {
            setAnimate1(1)
            setAnimate2(2)
            setAnimate3(0)
        } else if (animate1 == 1) {
            setAnimate1(2)
            setAnimate2(0)
            setAnimate3(1)
        } else {
            setAnimate1(0)
            setAnimate2(1)
            setAnimate3(2)
        }
    }

    const getImage = (offset) => {
        const newIndex = (index + offset + images.length) % images.length;
        return images[newIndex];
    };

    return (
        <>
            <Navbar2 />
            <div className="bg-dark w-100">
                <div className="row m-0 bg-dark align-items-center justify-content-center d-flex mt-5 heightt" id="home">
                    <div className="col-lg-5 col-md-6 col-sm-11 col-12 mb-lg-0 mb-4">
                        <div className="position-relative">
                            <h1 className="masala-text fw-bold">Masala</h1>
                            <h1 className="chai-text fw-bolder">Chai Is Life</h1>
                        </div>
                        <p className="text-light">Welcome to Chai Sutta Bar - Sip. Chill. Repeat. <br />India's favorite chai destination! From masala to herbal, we serve emotions in kulhads.</p>
                        <Link to="/Menu">
                            <button className="btn btn-outline-light btnnn">Order Now</button>
                        </Link>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-11 col-11 mb-lg-0 mb-4">
                        <button className="btn btn-light leftbtn" onClick={previous}>
                            <FaChevronLeft />
                        </button>
                        <img src={getImage(-1)} class={animate1 == 0 ? "img-up" : animate1 == 1 ? "img-center" : animate1 == 2 ? "img-down" : ""} />
                        <img src={getImage(0)} class={animate2 == 0 ? "img-up" : animate2 == 1 ? "img-center" : animate2 == 2 ? "img-down" : ""} />
                        <img src={getImage(1)} class={animate3 == 0 ? "img-up" : animate3 == 1 ? "img-center" : animate3 == 2 ? "img-down" : ""} />
                        <button className="btn btn-light rightbtn" onClick={next}>
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
                <div className="row m-0 mt-0 bg-dark align-items-center justify-content-center d-flex flex-wrap heightt" id="bestsellers">
                    <Bestsellers />
                </div>
                <div className="row m-0 mt-0 bg-dark align-items-center justify-content-center d-flex flex-wrap p-0" id="flavours">
                    <Flavours />
                </div>
            </div>
            <div className="row m-0 mt-0 bg-dark align-items-center justify-content-center d-flex flex-wrap p-0">
                <Footer />
            </div>
        </>
    )
}