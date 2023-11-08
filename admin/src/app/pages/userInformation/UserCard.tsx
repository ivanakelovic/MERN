import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import {Card} from "react-bootstrap";
import ModalComponent from "../../modals/ModalComponent";
import {getProfilePicture} from "./UserInformation";
import {Modal} from "react-bootstrap";
import {deleteUser, updateUser} from "../../shared/services/user.service";
import PieChartUserOffers from "../../shared/components/graphs/pieChartUsers";

const UserCard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // @ts-ignore
    const {user} = location.state || {};
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [confirmedAction, setConfirmedAction] = useState(null);
    const [isBlocking, setIsBlocking] = useState(user.isBlocked);

    useEffect(() => {
        console.log('Raw createdAt:', user.createdAt);
        console.log('Converted Date:', new Date(user.createdAt));
        console.log('Formatted:', new Date(user.createdAt).toLocaleString());
        console.log('user', user);
    }, [user.isBlocked]);

    const openConfirmationDialog = (action) => {
        setIsConfirmationOpen(true);
        setConfirmedAction(action);
    };

    const closeConfirmationDialog = () => {
        setIsConfirmationOpen(false);
        setConfirmedAction("");
    };

    const handleDeleteUser = async (userToDelete) => {
        setConfirmedAction("delete");
        setIsConfirmationOpen(true);

        console.log('userid', userToDelete.id);
        await deleteUser(userToDelete.id);
        navigate('/users');
    }

    const handleBlockUser = async (userToBlock) => {
        setConfirmedAction("block");
        setIsConfirmationOpen(true);

        const updatedUser = {
            firstName: userToBlock.firstName,
            lastName: userToBlock.lastName,
            email: userToBlock.email,
            password: userToBlock.password,
            documents: userToBlock.documents,
            isBlocked: !isBlocking
        };

        await updateUser(userToBlock.id.toString(), updatedUser);

        console.log('update data', updatedUser);


        setIsBlocking(!userToBlock.isBlocked);
        console.log('after blocking', isBlocking);
        closeConfirmationDialog();
    }

    const handleBlockDelete = () => {
        if (confirmedAction === "block") {
            handleBlockUser(user);
        }
        if (confirmedAction === "delete") {
            handleDeleteUser(user);
        }
    }

    const UserProfilePicture = ({profilePictureId}) => {
        const [picture, setPicture] = useState(null);

        useEffect(() => {
            getProfilePicture(profilePictureId)
                .then((pictureDisplay) => {
                    setPicture(pictureDisplay);
                });
        }, [profilePictureId]);

        return picture ? <Card.Img className='rounded-circle mx-auto d-block w-50'
                                   src={picture}
                                   style={{width: '150px', height: '150px'}}
        /> : null;
    };


    return (
        <div>
            <div className='d-flex justify-content-center align-items-center '>
                <Card className='card p-3 border border-black border-5 mb-3 col-10 col-md-8 col-lg-6'>
                    <Card.Body>
                        {<PieChartUserOffers user={user}/>}
                    </Card.Body>
                </Card>
            </div>
            <div className='d-flex justify-content-center align-items-center'>


                <Card className='border border-black border-5 col-10 col-md-8 col-lg-6'>
                    <Card.Title className='text-center'>
                        User Information
                    </Card.Title>
                    <Card.Body className='text-center'>
                        <UserProfilePicture profilePictureId={user.documents}/><br/>
                        <h1>{user.firstName} {user.lastName}</h1>

                        <div className='fv-row'>
                            <label className='form-label fs-4 fw-bolder text-dark'>Role:</label>
                            <label className='form-label fs-4 fw-bolder text-dark'>{user.role}</label>
                        </div>

                        <div className='fv-row'>
                            <label className='form-label fs-4 fw-bolder text-dark'>Email:</label>
                            <label className='form-label fs-4 fw-bolder text-dark'>{user.email}
                                {user.isEmailVerified ? (
                                    <span className="badge bg-success ms-2">Verified</span>
                                ) : (
                                    <span className="badge bg-danger ms-2">Not Verified</span>
                                )}
                            </label>
                        </div>
                        <div className='fv-row'>
                            <label className='form-label fs-6 fw-bolder text-dark'> User
                                Joined: {new Date(user.createdAt).toLocaleString()}</label>
                        </div>


                        <div className='d-flex justify-content-between'>
                            <div>
                                <button
                                    className='btn btn-sm'
                                    onClick={() => openConfirmationDialog("delete")}
                                >
                                    Delete User
                                </button>
                            </div>
                            <div>
                                <button className='btn btn-sm'
                                        onClick={() => openConfirmationDialog("block")}
                                >
                                    {!isBlocking ? "Block User" : "Unblock User"}
                                </button>
                            </div>
                        </div>

                    </Card.Body>

                    <ModalComponent
                        show={isConfirmationOpen}
                        onHide={closeConfirmationDialog}>
                        <Modal.Body>
                            {confirmedAction === "delete" ? (
                                <h2 className='no-wrap'>Are you sure you want to delete this user?</h2>
                            ) : (
                                !isBlocking ? (
                                    <h1>Are you sure you want to block this user?</h1>
                                ) : (
                                    <h1>Are you sure you want to unblock this user?</h1>
                                )
                            )}


                            <div className='d-flex justify-content-between'>
                                <div>
                                    <button className='btn btn-sm'
                                            onClick={handleBlockDelete}
                                    >
                                        Yes
                                    </button>
                                </div>
                                <div>
                                    <button className='btn btn-sm'
                                            onClick={closeConfirmationDialog}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>

                        </Modal.Body>
                    </ModalComponent>

                </Card>
            </div>
        </div>
    )
};

export default UserCard;