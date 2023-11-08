import React from "react";
import dashboardPicture from "./dashboard1.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faSearch, faChartLine} from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
import {useAuth} from "../../modules/auth/core/Auth";

export function InfoPage() {

    const {currentUser, logout} = useAuth()

        return(
        <div>

            <h1>Welcome {currentUser?.firstName}</h1>

            <br/>
            <div className="container-fluid p-0">
                <div className="row m-0">
                    <div className="col-12 p-0">
                        <div className="position-relative">
                            <img
                                src={dashboardPicture}
                                className="img-fluid w-100"
                                alt="InfoPage"
                                style={{height: "50vh", objectFit: "cover"}}
                            />

                            <div
                                className="overlay-text position-absolute top-50 start-3 translate-middle-y text-center">
                                <div className="card bg-transparent text-white p-4">
                                    <div className="card-body">

                                        <Link to="/create-tender"><h1 className="card-title display-4">How to Create
                                            Tenders?</h1></Link>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="d-flex justify-content-around align-items-center">
                <div className="d-flex flex-column align-items-center">
                    <div
                        className="icon-circle bg-primary rounded-circle d-flex align-items-center justify-content-center p-3">
                        <FontAwesomeIcon icon={faCheck} className="text-white fa-5x "/>
                    </div>
                    <br/>
                    <h1 className="text-uppercase mt-3">ENGAGE EARLIER</h1>

                </div>
                <div className="d-flex flex-column align-items-center">
                    <div
                        className="icon-circle bg-primary rounded-circle d-flex align-items-center justify-content-center p-3">
                        <FontAwesomeIcon icon={faSearch} className="text-white fa-5x "/>
                    </div>
                    <br/>
                    <h1 className="text-uppercase mt-3">BE MORE COMPETITIVE</h1>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <div
                        className="icon-circle bg-primary rounded-circle d-flex align-items-center justify-content-center p-3">
                        <FontAwesomeIcon icon={faChartLine} className="text-white fa-5x  "/>
                    </div>
                    <br/>
                    <h1 className="text-uppercase mt-3">SELL MORE EFFECTIVELY</h1>
                </div>

            </div>
            <br/>
            <br/>
            <br/>
            <div className="container mt-4">
                <div className="row justify-content-end">
                    <div className="col-md-4">
                        <form>
                            <div className="form-group">
                                <label htmlFor="question">Postavite pitanje:</label>
                                <textarea className="form-control" id="question"
                                          placeholder="Ovdje unesite vaše pitanje"></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="note">Napomena/komentar:</label>
                                <textarea className="form-control" id="note"
                                          placeholder="Ovdje ostavite napomenu ili komentar"></textarea>
                            </div>
                            <br/>
                            <button type="submit" className="btn btn-primary">Pošalji</button>
                        </form>
                    </div>
                </div>
            </div>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            <footer className="text-center text-lg-start  w-100 " style={{backgroundColor: '#5a6f8a'}}>

                <section
                    className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom container-fluid">
                    <div className="me-5 d-none d-lg-block fw-bolder text-dark">
                        <span>Get connected with us on social networks:</span>
                    </div>


                    <div className="fw-bold">
                        <a href="https://www.facebook.com" className="me-4 text-reset">
                            <i className="fab fa-facebook-f fa-bold text-black fw-bold"></i>
                        </a>
                        <a href="https://www.twitter.com" className="me-4 text-reset">
                            <i className="fab fa-twitter fa-bold text-black fw-bold"></i>
                        </a>
                        <a href="https://www.google.com" className="me-4 text-reset">
                            <i className="fab fa-google fa-bold text-black fw-bold"></i>
                        </a>
                        <a href="https://www.instagram.com" className="me-4 text-reset">
                            <i className="fab fa-instagram fa-bold text-black fw-bold"></i>
                        </a>
                        <a href="https://www.linkedin.com" className="me-4 text-reset">
                            <i className="fab fa-linkedin fa-bold text-black fw-bold"></i>
                        </a>
                        <a href="https://www.github.com" className="me-4 text-reset">
                            <i className="fab fa-github fa-bold text-black fw-bold"></i>
                        </a>
                    </div>

                </section>


                <section className="container-fluid">
                    <div className="container text-center text-md-start mt-5">

                        <div className="row mt-3">

                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                {/* Content */}
                                <h6 className="text-uppercase fw-bold mb-4">TENDER PRO
                                </h6>
                                <p>
                                    Our company specializes in tender management services, facilitating efficient and
                                    transparent bidding processes for various projects. Our mission is to connect
                                    qualified businesses with lucrative opportunities, fostering fair competition and
                                    delivering exceptional results.
                                </p>
                            </div>

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    TENDERS
                                </h6>
                                <p>
                                    <a href="#!" className="text-reset">Tender1</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Tender2</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Tender3</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Tender4</a>
                                </p>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

                                <h6 className="text-uppercase fw-bold mb-4">
                                    LINKS
                                </h6>
                                <p>
                                    <Link to="/all-tenders"> <a href="#!" className="text-reset"> Tenders</a></Link>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Settings</a>
                                </p>
                                <p>
                                    <Link to="/create-tender"> <a href="#!" className="text-reset">Create
                                        Tender</a></Link>

                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Help</a>
                                </p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                <p><i className="fas fa-home me-3 fa-bold text-black fw-bold"></i> Stefana Nemanje, IS
                                    58463, BA</p>
                                <p>
                                    <i className="fas fa-envelope me-3 fa-bold text-black fw-bold"></i>
                                    tenderspro@tenderpro.com
                                </p>
                                <p><i className="fas fa-phone me-3 fa-bold text-black fw-bold "></i> + 01 111 111 11</p>
                                <p><i className="fas fa-print me-3 fa-bold text-black fw-bold"></i>+ 02 222 222 22</p>
                            </div>
                        </div>

                    </div>
                </section>


                <div className="text-center p-4 text-black" style={{backgroundColor: '#ef1a07'}}>
                    © 2023 Tender Pro

                </div>

            </footer>

        </div>


    );



}
