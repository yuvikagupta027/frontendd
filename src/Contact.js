import Navbar2 from "./Navbar2";
import Footer from "./Footer";

export default function Contact() {
    return (
        <>
            <Navbar2 />
            <div className="bg-dark pt-5 justify-content-center align-items-center mt-5 heightmenu">
                <div className="row justify-content-center px-2 mx-auto">

                    <div className="col-lg-5 col-md-6 col-sm-12 mt-lg-5">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112070.65138662848!2d77.12494200074434!3d28.6235318499913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d033d4ce449bd%3A0xba6b9d544c82cac2!2sChai%20Sutta%20Bar%2C%20Karol%20Bagh!5e0!3m2!1sen!2sin!4v1744797541883!5m2!1sen!2sin"
                            width="100%"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded"
                        ></iframe>
                    </div>

                    <div className="col-lg-5 col-md-6 col-sm-12 mt-lg-5">
                        <div className="card p-4 mb-2">
                            <h5 className="fw-bold text-dark text-center">Online Enquiry</h5>
                            <form>
                                <input type="text" placeholder="Name" name="name" className="form-control mb-2" />
                                <input type="email" placeholder="Email" name="email" className="form-control mb-2" />
                                <input type="text" placeholder="Subject" name="subject" className="form-control mb-2" />
                                <textarea placeholder="Message" name="message" rows="3" className="form-control mb-3" />
                                <button type="submit" className="btn btn-dark w-100">Submit</button>
                            </form>
                        </div>
                        <div className="card p-4">
                            <div className="d-flex justify-content-between">
                                <div className="col-4">
                                    <p className="text-dark"><h6 className="fw-bold text-dark">Email-</h6> chaiislife@gmail.com</p>
                                </div>
                                <div className="col-8">
                                    <p className="text-dark"><h6 className="fw-bold text-dark">Address-</h6> Chai Is Lifee, Karol Bagh
                                        7A, Channa Market, Block 7A, WEA, Karol Bagh, New Delhi, Delhi, 110005</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="row m-0 mt-0 bg-dark align-items-center justify-content-center d-flex flex-wrap p-0">
                <Footer />
            </div>
        </>
    );
}
