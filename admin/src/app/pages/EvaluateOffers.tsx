import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ModalComponent from "../modals/ModalComponent";
import EvaluateTender from "./evaluators/EvaluateTender";
import {getFileContent} from "../shared/services/fileContent.service";
import {getFile} from "../shared/services/file.service";
import {getUser} from "../shared/services/user.service";
import {Modal} from "react-bootstrap";

const EvaluateOffers = () => {
    const location = useLocation();
    // @ts-ignore
    const {offer} = location.state || {};
    const [isOpen, setIsOpen] = useState(false);
    const [fileContent, setFileContent] = useState(null);
    const [file, setFile] = useState(null);
    const [user, setUser] = useState(null);
    const [company, setCompany] = useState(null);

    const toggle = () => setIsOpen(!isOpen);

    const showFile = async () => {
        const fileBlob = await getFileContent(offer.documents);
        setFileContent(URL.createObjectURL(fileBlob));

        const file = await getFile(offer.documents);
        setFile(file);
    }

    const handleShow = () => {
        setIsOpen(true);
    };

    const downloadFile = () => {
        if (file) {
            const link = document.createElement('a');
            link.href = fileContent;
            link.download = file.fileName + '.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }


    const userInfo = async () => {
        const userData = await getUser(offer.createdBy);
        console.log('userdata', userData);
        setUser(userData);

        /*if (user.role == 'vendor') {
            const companyData = await getCompany(user.company);
            setCompany(companyData);
        }*/

    }

    useEffect(() => {
        userInfo();
        showFile();
    }, [])

    // @ts-ignore
    return (
        <React.Fragment>

            <div className='d-flex justify-content-center align-items-center' style={{minHeight: '60vh'}}>
                <Card className='p-3 border border-black border-5 col-sm-10 col-md-8 col-lg-6'>
                    <Card.Title className='text-center'>
                        <h1>Offer details</h1>
                    </Card.Title>
                    <Card.Body>
                        <div className='fv-row text-center'>
                            <label className='form-label fs-6 fw-bolder text-dark'>Offered Money: </label>
                            <label>{offer.offer} $</label>
                        </div>
                        <br/>

                        <div className='fv-row text-center'>
                            <label className='form-label fs-6 fw-bolder text-dark'>Winner Offer: </label>
                            <label>
                                {offer.isSelected ? (
                                    <label className='text-success'>Yes</label>
                                ) : (
                                    <label className='text-danger'>No</label>
                                )}
                            </label>
                        </div>
                        <br/>

                        {user && (
                            <div className='fv-row text-center'>
                                <label className='form-label fs-6 fw-bolder text-dark'>Created By: </label>
                                <label>{user.firstName} {user.lastName}</label>
                                <br/>
                            </div>

                        )}

                        {user && user.role === 'vendor' && (
                            <div className='fv-row text-center'>
                                <label className='form-label fs-6 fw-bolder text-dark'>Company: </label>
                                <label>{company.name}</label>
                                <br/>
                            </div>
                        )}


                        <div className='fv-row text-center'>
                            <label className='form-label fs-6 fw-bolder text-dark'>Documents:</label><br/>
                            <iframe
                                src={fileContent}
                                width="100%"
                                height="500px"
                                className='text-center'
                            />
                        </div>

                        <div className='d-flex justify-content-between'>
                            <button
                                className="btn btn-lg btn-success"
                                onClick={downloadFile}
                            >Download File
                            </button>
                            <button className='btn btn-lg btn-info' onClick={() => handleShow()}>Evaluate offer</button>
                        </div>
                    </Card.Body>
                </Card>
                {/* <ModalComponent show={isOpen} onHide={toggle}>

                <EvaluateTender offer={offer}/>


            </ModalComponent>*/}

                <Modal show={isOpen} onHide={toggle}>
                    <Modal.Header closeButton>
                        <Modal.Title>Evaluate Offer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EvaluateTender offer={offer}/>
                    </Modal.Body>
                </Modal>

            </div>
        </React.Fragment>
    );
};

export default EvaluateOffers;