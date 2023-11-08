import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";


const ModalComponent = ({children, show, onHide}) => {

    return (
        <div>
            <Modal show={show} onHide={onHide} className='d-flex justify-content-center align-items-center'
                   dialogClassName='modal-lg'>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ModalComponent;