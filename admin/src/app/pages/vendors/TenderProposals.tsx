import React, {useState, useRef} from "react";
import clsx from 'clsx';
import * as Yup from 'yup';
import {useFormik} from "formik";
import {useAuth} from "../../modules/auth";
import {createOffer} from "../../shared/services/offer.service";
import {OfferModel} from "../../shared/models/offer.model";
import {createFile} from "../../shared/services/file.service";
import {getFiles} from "../../shared/services/file.service";
import {showSuccessMessage} from "../../shared/components/messages/success-createtender-message";
import {showErrorMessage} from "../../shared/components/messages/error-createtender-message";

const TenderProposals = ({tender, user}) => {

    const tenderProposalSchema = Yup.object().shape({

        offer: Yup.number().positive()
            .min(1, 'Minimum 1$')
            .required('Offer is required'),
        documents: Yup.mixed().required('File is required'),
    })

    const initialValues = {
        offer: '0',
        documents: ''
    }

    const [loading, setLoading] = useState(false);
    const [isFormSubmitted, setFormSubmitted] = useState(false);
    const [offer, setOffer] = useState('');
    const [documents,setDocuments]=useState('');
    const [error, setError] = useState('');
    const {saveAuth, setCurrentUser} = useAuth();

    const formik = useFormik({
        initialValues,
        validationSchema: tenderProposalSchema,

        onSubmit: async (values, {setStatus, setSubmitting}) => {
            setLoading(true);
            setError(null);
            try {

                const formData = new FormData();
                formData.append('documents', values.documents);
                console.log('uploaded doc', values.documents);

                formData.append('createdBy', user.id);

                const savedFiles = await createFile(formData);

                const files = await getFiles();

                console.log(files);

                const lastUploadedFile = files[files.length - 1];
                console.log('Last Uploaded File:', lastUploadedFile);
                console.log('last id ', lastUploadedFile.id);

                if (lastUploadedFile) {
                    const newOffer = new OfferModel({
                        offer: values.offer,
                        tender: tender.id,
                        createdBy: user.id,
                        documents: lastUploadedFile.id,
                        isSelected: false
                    });
                    const createdOffer = await createOffer(newOffer);
                    showSuccessMessage('Offer successfully created!');

                    console.log(createdOffer);
                }
            } catch (error) {
                console.error(error);
                setStatus('Incorrect data entered');
                setLoading(false);
                showErrorMessage('Failed to create offer!')
            }
        }
    })

    return (
        <div className='d-flex justify-content-center '>
            <div className='col-10 col-md-10 col-lg-10 '>
                <form
                    className='form'
                    onSubmit={formik.handleSubmit}
                    noValidate
                    id='kt_dashboard_offer_form'
                    encType='multipart/form-data'
                >

                    <h1 className='text-center text-dark'>Create offer for following tender</h1>
                    <hr/>

                    <div className='text-center'>
                        <h2 className='text-primary'>Tender Details</h2>
                        <b>Tender Title:</b> {tender.title} <br/>
                        <b>Tender Description:</b> {tender.description} <br/>
                        <b>Tender Criteria:</b> {tender.criteria} <br/>
                        <b>Tender Weightage:</b> {tender.weightage} <br/>
                        <hr/>
                    </div>
                    <div className=''>
                        <div className='fv-row'>
                            <label className='form-label fs-6 fw-bolder text-dark'>Your offer {<span
                                className="required"></span>}</label>
                            <div className='input-group input-group-lg mb-3'>
                                <input
                                    value={offer}
                                    onChange={(e) => {
                                        setOffer(e.target.value)
                                    }}
                                    type='number'
                                    name='offer'
                                    placeholder='Enter offer'
                                    {...formik.getFieldProps('offer')}
                                    className={clsx('form-control form-control-lg',
                                        {'is-invalid': (formik.touched.offer || isFormSubmitted) && formik.errors.offer},
                                        {'is-valid': (formik.touched.offer || isFormSubmitted) && !formik.errors.offer}
                                    )}
                                />
                                <div className='input-group-append'>
                                    <span className='input-group-text'>$</span>
                                </div>

                            </div>

                            {formik.touched.offer && formik.errors.offer && (
                                <div className='fv-plugins-message-container'>
                                    <span className='text-danger' role='alert'>{formik.errors.offer}</span>
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


                        <button
                            type='submit'
                            className='btn btn-lg w-100 mb-5'
                            id='kt_dashboard_offer_submit'
                        >
                            Submit
                        </button>

                    </div>
                </form>

            </div>
        </div>
    );
};

export default TenderProposals;