import React, {useState} from "react";
import * as Yup from 'yup';
import {useFormik} from "formik";
import {createTender} from '../../shared/services/tender.service';
import {TenderModel} from '../../shared/models/tender.model';
import {showSuccessMessage} from '../../shared/components/messages/success-createtender-message';
import {showErrorMessage} from '../../shared/components/messages/error-createtender-message';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
import {createFile} from "../../shared/services/file.service";
import {getFiles} from "../../shared/services/file.service";
import {useAuth} from "../../modules/auth";
import clsx from "clsx";
import createtender from "./createtender.jpg";

import CoinAnimation from "./CoinAnimation";

import CoinFlip from "./CoinFlip";

export function CreateTender() {
    const [loading, setLoading] = useState(false);
    const [isFormSubmitted, setFormSubmitted] = useState(false);
    const {currentUser, logout} = useAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [criteria, setCriteria] = useState('');
    const [weightage, setWeightage] = useState('');
    const [deadline, setDeadline] = useState('');
    const [description, setDescription] = useState('');
    const [documents, setDocuments] = useState('');


    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        deadline: Yup.date().required('Deadline is required'),
        documents: Yup.mixed().required('File is required'),
        criteria: Yup.string().required('Criteria are required'),
        weightage: Yup.number()
            .required('Weightage is required')
            .positive('Weightage must be a positive number'),
    })

    const initialValues = {
        title: '',
        description: '',
        deadline: '',
        documents: '',
        criteria: '',
        weightage: '100',
    };


    const formik = useFormik({
        initialValues,
        validationSchema,

        onSubmit: async (values, {setStatus, setSubmitting}) => {
            setLoading(true);
            setError(null);
            try {
                const formData = new FormData();
                formData.append('documents', values.documents);
                console.log('uploaded doc', values.documents);

                formData.append('createdBy', currentUser.id.toString());

                const savedFiles = await createFile(formData);

                const files = await getFiles();

                console.log(files);

                const lastUploadedFile = files[files.length - 1];
                console.log('Last Uploaded File:', lastUploadedFile);
                console.log('last id ', lastUploadedFile.id);

                if (lastUploadedFile) {
                    const newTender = new TenderModel({
                        title: values.title,
                        description: values.description,
                        deadline: values.deadline,
                        criteria: values.criteria,
                        weightage: values.weightage,
                        documents: lastUploadedFile.id,
                        createdBy: currentUser.id.toString()
                    });
                    const createdTender = await createTender(newTender);
                    showSuccessMessage('Tender successfully created!');
                    navigate('/all-tenders');

                    console.log(createdTender);
                }
                setLoading(false);


            } catch (error) {
                console.error(error);
                setStatus('Incorrect data entered');
                setLoading(false);
                showErrorMessage('Failed to create offer!')
            }

        }


    });
    return (
        <div className='d-flex justify-content-center align-items-center mt-5'>

            <div className="col-10 col-md-8 col-lg-6">
                <form
                    className='form card p-3'
                    onSubmit={formik.handleSubmit}
                    noValidate
                    encType='multipart/form-data'
                >
                    <h1 className='text-center text-dark p-4 mt-1'>Create Tender</h1>

                    <div className=''>
                        <div className='fv-row'>
                            <label className='form-label fs-6 fw-bolder text-dark'>Title{<span
                                className="required"></span>}</label>
                            <div className='input-group input-group-lg mb-3'>
                                <input
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value)
                                    }}
                                    type='text'
                                    name='title'
                                    placeholder='Enter title'
                                    {...formik.getFieldProps('title')}
                                    className={clsx('form-control form-control-lg form-control-solid',
                                        {'is-invalid border border-danger': (formik.touched.title || isFormSubmitted) && formik.errors.title},
                                        {'is-valid border border-success': (formik.touched.title || isFormSubmitted) && !formik.errors.title}
                                    )}
                                />

                            </div>

                            {formik.touched.title && formik.errors.title && (
                                <div className='fv-plugins-message-container'>
                                    <span className='text-danger' role='alert'>{formik.errors.title}</span>
                                </div>
                            )}
                        </div>


                        <div className='fv-row'>
                            <label className='form-label fs-6 fw-bolder text-dark'>Description{<span
                                className="required"></span>}</label>
                            <div className='input-group input-group-lg mb-3'>
                                <input
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value)
                                    }}
                                    type='text'
                                    name='description'
                                    placeholder='Enter description'
                                    {...formik.getFieldProps('description')}
                                    className={clsx('form-control form-control-lg form-control-solid',
                                        {'is-invalid border-danger': (formik.touched.description || isFormSubmitted) && formik.errors.description},
                                        {'is-valid border-success': (formik.touched.description || isFormSubmitted) && !formik.errors.description}
                                    )}
                                />

                            </div>

                            {formik.touched.description && formik.errors.description && (
                                <div className='fv-plugins-message-container'>
                                    <span className='text-danger' role='alert'>{formik.errors.description}</span>
                                </div>
                            )}
                        </div>

                        <div className='fv-row'>
                            <label className='form-label fs-6 fw-bolder text-dark'>Deadline{<span
                                className="required"></span>}</label>
                            <div className='input-group input-group-lg mb-3'>
                                <input
                                    value={deadline}
                                    onChange={(e) => {
                                        setDeadline(e.target.value)
                                    }}
                                    type='date'
                                    name='deadline'
                                    placeholder='Enter offer'
                                    {...formik.getFieldProps('deadline')}
                                    className={clsx('form-control form-control-lg form-control-solid',
                                        {'is-invalid border-danger': (formik.touched.deadline || isFormSubmitted) && formik.errors.deadline},
                                        {'is-valid border-success': (formik.touched.deadline || isFormSubmitted) && !formik.errors.deadline}
                                    )}
                                />

                            </div>

                            {formik.touched.deadline && formik.errors.deadline && (
                                <div className='fv-plugins-message-container'>
                                    <span className='text-danger' role='alert'>{formik.errors.deadline}</span>
                                </div>
                            )}
                        </div>

                        <div className=' fv-row mb-10'>

                            <label className='form-label fs-6 fw-bolder text-dark'>Documents{<span
                                className="required"></span>}</label>
                            <input
                                type="file"
                                name='documents'
                                value={documents}
                                multiple={false}
                                onChange={(event) => {
                                    console.log('event', event.currentTarget.files[0]);
                                    formik.setFieldValue('documents', event.currentTarget.files[0])
                                    formik.setFieldTouched('documents', true, false);
                                }}
                                onBlur={formik.handleBlur}
                                className={clsx(
                                    'form-control form-control-lg form-control-solid',

                                    {'is-invalid border border-danger': (formik.touched.documents || isFormSubmitted) && formik.errors.documents},
                                    {'is-valid border border-success': (formik.touched.documents || isFormSubmitted) && !formik.errors.documents}
                                )}
                            />
                            {formik.touched.documents && formik.errors.documents && (
                                <div className='fv-plugins-message-container'>
            <span className='text-danger' role='alert'>
                {formik.errors.documents}
            </span>
                                </div>
                            )}
                        </div>

                        <div className='fv-row'>
                            <label className='form-label fs-6 fw-bolder text-dark'>Criteria {<span
                                className="required"></span>}</label>
                            <div className='input-group input-group-lg mb-3'>
                                <input
                                    value={criteria}
                                    onChange={(e) => {
                                        setCriteria(e.target.value)
                                    }}
                                    type='text'
                                    name='criteria'
                                    placeholder='Enter criteria'
                                    {...formik.getFieldProps('criteria')}
                                    className={clsx('form-control form-control-lg form-control-solid',
                                        {'is-invalid border border-danger': (formik.touched.criteria || isFormSubmitted) && formik.errors.criteria},
                                        {'is-valid border border-success': (formik.touched.criteria || isFormSubmitted) && !formik.errors.criteria}
                                    )}
                                />


                            </div>

                            {formik.touched.criteria && formik.errors.criteria && (
                                <div className='fv-plugins-message-container'>
                                    <span className='text-danger' role='alert'>{formik.errors.criteria}</span>
                                </div>
                            )}
                        </div>


                        <div className='fv-row'>
                            <label className='form-label fs-6 fw-bolder text-dark'>Weightage {<span
                                className="required"></span>}</label>
                            <div className='input-group input-group-lg mb-3'>
                                <input
                                    value={weightage}
                                    onChange={(e) => {
                                        setWeightage(e.target.value)
                                    }}
                                    type='number'
                                    name='weightage'
                                    placeholder='Enter weightage'
                                    {...formik.getFieldProps('weightage')}
                                    className={clsx('form-control form-control-lg form-control-solid',
                                        {'is-invalid border-danger': (formik.touched.weightage || isFormSubmitted) && formik.errors.weightage},
                                        {'is-valid border-success': (formik.touched.weightage || isFormSubmitted) && !formik.errors.weightage}
                                    )}
                                />

                                <div className='input-group-append'>
                                    <span className='input-group-text'>$</span>
                                </div>

                            </div>

                            {formik.touched.weightage && formik.errors.weightage && (
                                <div className='fv-plugins-message-container'>
                                    <span className='text-danger' role='alert'>{formik.errors.weightage}</span>
                                </div>
                            )}
                        </div>

                    </div>


                    <br/>
                    <button className="btn btn-lg w-100 mb-5 text-dark" type="submit" disabled={loading}>
                        Submit
                    </button>

                </form>

            </div>
            {/*<div> <img src={createtender} alt="tender photo" style={{ width: '50px', height: '50px' }} /></div>  */}
        </div>


    );
}

export default CreateTender;



