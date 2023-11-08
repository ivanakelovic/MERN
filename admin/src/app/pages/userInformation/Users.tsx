import React from "react";
import {getUsers, updateUser, deleteUser} from "../../shared/services/user.service";
import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useAuth} from "../../modules/auth";
import clsx from 'clsx';
import {createFile, getFiles} from "../../shared/services/file.service";
import {getCompanies, getCompany} from "../../shared/services/company.service";
import {Card} from "react-bootstrap";
import {getProfilePicture} from "./UserInformation";
import {Pagination} from "../../shared/components/pagination/pagination";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationData, setPaginationData] = useState({});
    const [currentLimit, setCurrentLimit] = useState(10);
    const [deletedItemId, setDeletedItemId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const {currentUser, logout} = useAuth();
    const [isEditMode, setIsEditMode] = useState(false);
    const [picture, setPicture] = useState(null);
    const [uploadedPicture, setUploadedPicture] = useState(null);
    const [isPictureUploaded, setIsPictureUploaded] = useState(false);
    const [companies, setCompanies] = useState({});
    const [editedCardIndex, setEditedCardIndex] = useState(-1);

    const [userEditModel, setUserEditModes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isBlockDeleteMode, setIsBlockDeleteMode] = useState(false);
    const [removeIndex, setRemoveIndex] = useState(-1);

    const navigate = useNavigate();
    const navigateToUser = (user) => {
        //  console.log('user: ',user);
        navigate(`/users/${user.id}`, {state: {user}});
    }

    const userSchema = Yup.object().shape({
        firstName: Yup.string(),
        lastName: Yup.string(),
        email: Yup.string()
            .email('Wrong email format')
            .min(3, 'Minimum 3 symbols')
            .max(50, 'Maximum 50 symbols'),
        password: Yup.string()
            .min(3, 'Minimum 3 symbols')
            .max(50, 'Maximum 50 symbols'),
        role: Yup.string(),
        isEmailVerified: Yup.boolean(),
        company: Yup.string(),
        documents: Yup.mixed(),
        isBlocked: Yup.boolean()
    });

    const UserProfilePicture = ({profilePictureId}) => {
        const [picture, setPicture] = useState(null);

        useEffect(() => {
            getProfilePicture(profilePictureId)
                .then((pictureDisplay) => {
                    setPicture(pictureDisplay);
                });
        }, [profilePictureId]);

        return picture ?
            <Card.Img
                src={picture}
                className='rounded-circle mx-auto d-block w-150 h-150'
                style={{width: '150px', height: '150px'}}
                alt='Profile'
            />

            : null;
    };

    useEffect(() => {

        if (!isPictureUploaded) {
            getProfilePicture(currentUser.documents)
                .then((pictureDisplay) => {
                    setPicture(pictureDisplay);
                });
        }
        fetchUsers({});
        console.log(users);
        setUserEditModes(new Array(users.length).fill(false));
    }, []);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchUsers({
            page: newPage,
            limit: currentLimit,
        });
    };

    const handleLimitChange = (newValue) => {
        setCurrentLimit(newValue);
        fetchUsers({
            limit: newValue,
            page: 1,
        });
    };


    const fetchUsers = (filterOptions) => {
        getUsers(filterOptions)
            .then(([pagination, allUsers]) => {
                const usersCompany = allUsers.map(user => {
                    if (user.role === 'vendor') {

                    }
                })
                setUsers(allUsers);
                setPaginationData(pagination)
                console.log(allUsers[1].firstName);

            })
            .catch((error) => {
                console.error(error);
            });
    };

    const fetchCompanyData = async () => {
        const companies = await getCompanies();

    }


    const formik = useFormik({
        initialValues: {
            firstName: editedCardIndex !== -1 ? users[editedCardIndex].firstName : '',
            lastName: editedCardIndex !== -1 ? users[editedCardIndex].lastName : '',
            email: editedCardIndex !== -1 ? users[editedCardIndex].email : '',
            password: editedCardIndex !== -1 ? users[editedCardIndex].password : '',
            role: editedCardIndex !== -1 ? users[editedCardIndex].role : '',
            documents: editedCardIndex !== -1 ? users[editedCardIndex].documents : '',
            isBlocked: editedCardIndex !== -1 ? users[editedCardIndex].isBlocked : '',
        },
        validationSchema: userSchema,
        onSubmit: async (values, {setSubmitting}) => {
            try {
                console.log('submit');
                console.log('values', values);
                if (uploadedPicture) {
                    const formData = new FormData();
                    formData.append('documents', uploadedPicture);
                    formData.append('createdBy', currentUser.id.toString());

                    await createFile(formData);

                    setPicture(URL.createObjectURL(uploadedPicture));

                    const files = await getFiles();
                    const lastUploadedFile = files[files.length - 1];
                    values.documents = lastUploadedFile.id;
                }
                const update = await updateUser(currentUser.id.toString(), {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                    documents: values.documents,
                });

                console.log('update', update)

                setIsEditMode(false);
            } catch (error) {
                console.error('Error occurred while updating user', error);
            } finally {
                setSubmitting(false);
            }
        }
    })

    const handleCloseModal = () => {
        setShowModal(false);
    }


    const enterEditMode = (index) => {
        setIsEditMode(true);
        setEditedCardIndex(index);
        formik.setValues({
            firstName: users[index].firstName,
            lastName: users[index].lastName,
            email: users[index].email,
            password: users[index].password,
            role: users[index].role,
            documents: users[index].documents,
            isBlocked: users[index].isBlocked
        })
    }


    // @ts-ignore
    return (
        <div>
            <Card className='bg-yellow'>
                <div className='d-flex flex-wrap justify-content-between'>
                    {users && (
                        users.map((user, index) => (


                            <Card
                                key={user.id}
                                className='card p-3 border border-black border-5 mb-3 col-10 col-md-8 col-lg-6 mr-2'
                                style={{flex: '0 0 calc(50% - 0.5rem)'}}
                            >
                                {editedCardIndex === index ? (
                                        <form
                                            onSubmit={formik.handleSubmit}>

                                            <Card.Body>

                                                <UserProfilePicture profilePictureId={user.documents}/><br/>

                                                <label className='form-label fs-6 fw-bolder text-dark'>First Name: </label>
                                                <input
                                                    type='text'
                                                    id='firstName'
                                                    name='firstName'
                                                    value={formik.values.firstName}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className={clsx('form-control form-control-lg',
                                                        {'is-invalid': (formik.touched.firstName) && formik.errors.firstName},
                                                        {'is-valid': (formik.touched.firstName) && !formik.errors.firstName}
                                                    )}/>

                                                {formik.touched.lastName && formik.errors.lastName && (
                                                    <div className='fv-plugins-message-container'>
    <span className='text-danger' role='alert'>
        {formik.errors.firstName as React.ReactNode}
    </span>
                                                    </div>
                                                )}


                                                <br/>
                                                <label className='form-label fs-6 fw-bolder text-dark'>Last Name: </label>
                                                <input
                                                    type='text'
                                                    id='lastName'
                                                    name='lastName'
                                                    value={formik.values.lastName}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className={clsx('form-control form-control-lg',
                                                        {'is-invalid': (formik.touched.lastName) && formik.errors.lastName},
                                                        {'is-valid': (formik.touched.lastName) && !formik.errors.lastName}
                                                    )}/>


                                                {formik.touched.lastName && formik.errors.lastName && (
                                                    <div className='fv-plugins-message-container'>
        <span className='text-danger' role='alert'>
            {formik.errors.lastName as React.ReactNode}
        </span>
                                                    </div>
                                                )}


                                                <div>

                                                    <br/>
                                                    <label className='form-label fs-6 fw-bolder text-dark'>Email: </label>

                                                    <input
                                                        type='text'
                                                        id='email'
                                                        value={formik.values.email}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className={clsx('form-control form-control-lg',
                                                            {'is-invalid': (formik.touched.email) && formik.errors.email},
                                                            {'is-valid': (formik.touched.email) && !formik.errors.email}
                                                        )}
                                                    />
                                                    {formik.touched.email && formik.errors.email && (
                                                        <div className='fv-plugins-message-container'>
        <span className='text-danger' role='alert'>
            {formik.errors.email as React.ReactNode}
        </span>
                                                        </div>
                                                    )}

                                                </div>

                                                <div>
                                                    <br/>
                                                    <label
                                                        className='form-label fs-6 fw-bolder text-dark'>Password: </label>
                                                    <input
                                                        type='password'
                                                        id='text'
                                                        value={formik.values.password}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className={clsx('form-control form-control-lg',
                                                            {'is-invalid': (formik.touched.password) && formik.errors.password},
                                                            {'is-valid': (formik.touched.password) && !formik.errors.password}
                                                        )}
                                                    />
                                                    {formik.touched.password && formik.errors.password && (
                                                        <div className='fv-plugins-message-container'>
                                                    <span className='text-danger'
                                                          role='alert'>{formik.errors.password as React.ReactNode}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <br/>
                                                    <label className='form-label fs-6 fw-bolder text-dark'>Role: </label>
                                                    <input
                                                        type='text'
                                                        id='role'
                                                        value={formik.values.role}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className={clsx('form-control form-control-lg',
                                                            {'is-invalid': (formik.touched.role) && formik.errors.role},
                                                            {'is-valid': (formik.touched.role) && !formik.errors.role}
                                                        )}
                                                    />
                                                    {formik.touched.role && formik.errors.role && (
                                                        <div className='fv-plugins-message-container'>
        <span className='text-danger' role='alert'>
            {formik.errors.role as React.ReactNode}
        </span>
                                                        </div>
                                                    )}

                                                </div>
                                                <div className='d-flex justify-content-between mt-3'>
                                                    <div>
                                                        <button
                                                            className='btn btn-lg'
                                                            type='submit'>
                                                            Save Changes
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <button
                                                            className='btn btn- btn-secondary'
                                                            onClick={() => {
                                                                setIsEditMode(false);
                                                                setEditedCardIndex(-1);
                                                            }}>
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>

                                            </Card.Body>

                                        </form>

                                    )
                                    :

                                    (
                                        <div>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <button className='btn btn-sm btn-info'
                                                            onClick={() => enterEditMode(index)}
                                                    >
                                                        Edit User
                                                    </button>
                                                </div>
                                                <div>
                                                    <button className='btn btn-sm'
                                                            onClick={() => {
                                                                navigateToUser(user);
                                                            }}
                                                    >
                                                        Remove User
                                                    </button>
                                                </div>
                                            </div>


                                            <br/>

                                            <UserProfilePicture profilePictureId={user.documents}/><br/>

                                            <Card.Title className='text-center'>
                                                <label>{user.firstName} {user.lastName}</label>
                                                <br/>
                                            </Card.Title>
                                            <label className='form-label fs-6 fw-bolder text-dark'>{user.email}</label>
                                            <label>{formik.values.password}</label>
                                            <div>
                                                {user.isEmailVerified ? (
                                                    <span
                                                        className='form-label fs-6 fw-bolder text-success'>Verified</span>
                                                ) : (
                                                    <span className='form-label fs-6 fw-bolder text-danger'>Not
                                                    verified </span>
                                                )}
                                            </div>
                                            <label
                                                className='form-label fs-6 fw-bolder text-dark'>role: {user.role}</label>

                                            {/* <div>

                                                {user.role === 'vendor' && (
                                                    <div className='fv-row'>
                                                        <label
                                                            className='form-label fs-6 fw-bolder text-dark'>company: </label><br/>
                                                        <label>{

                                                        }</label>

                                                    </div>
                                                )}
                                            </div>*/}
                                        </div>
                                    )
                                }


                            </Card>
                        ))
                    )}

                </div>
            </Card>
            <br/>
            <Pagination
                paginationData={paginationData}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
            />
        </div>


    )
};

export default Users;