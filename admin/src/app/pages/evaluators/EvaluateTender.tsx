import React, {useState, useEffect} from "react";
import clsx from "clsx";
import {useFormik} from "formik";
import * as Yup from "yup";
import {createEvaluator} from "../../shared/services/evaluator.service";
import {EvaluatorModel} from "../../shared/models/evaluator.model";
import {showSuccessMessage} from "../../shared/components/messages/success-createtender-message";
import {showErrorMessage} from "../../shared/components/messages/error-createtender-message";

const EvaluateTender = ({offer}) => {
    const [isSubmissionAllowed, setIsSubmissionAllowed] = useState(true);
    const [evaluations, setEvaluations] = useState([]);
    const [remainingTime, setRemainingTime] = useState(0);

    const evaluationSchema = Yup.object().shape({
        rating: Yup.number()
            .min(1, "Rating should be at least 1")
            .max(5, "Rating should not exceed 5")
            .required("Rating is required"),
        comment: Yup.string().required("Comment is required"),
        collaborators: Yup.string().required("Collaborators are required"),
    });

    const formik = useFormik({
        initialValues: {
            //proposal: "",
            rating: "",
            comment: "",
            collaborators: "",
        },
        validationSchema: evaluationSchema,
        onSubmit: async (values) => {
            try {
                const offerId = offer.id;

                const newEvaluation = new EvaluatorModel({...values, offer: offerId});

                // @ts-ignore
                const createdEvaluation = await createEvaluator(newEvaluation);
                console.log(createdEvaluation);
                showSuccessMessage('Evaluation successfully created!')
            } catch (error) {
                console.error(error);
                showErrorMessage('Failed to create evaluation!')
            }
        },
    });

    useEffect(() => {
        const timeLimit = 5 * 60 * 1000;

        const timer = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1000);
        }, 1000);

        setTimeout(() => {
            clearInterval(timer);
            setIsSubmissionAllowed(false);
        }, timeLimit);

        return () => {
            clearInterval(timer);
            setRemainingTime(0);
        };
    }, []);

    return (
        <div className="d-flex justify-content-center">
            <div className="col-lg-12 col-md-12 col-md-12">
                <form
                    className="form"
                    onSubmit={formik.handleSubmit}>

                    <div className='text-center'>
                        <h2>Offer Details</h2>
                        <b>Offer Value:</b> $ {offer.offer} <br/>
                        <b>Offer Won:</b> {offer.isSelected ? 'YES' : 'NO'}
                    </div>

                    <div>
                        <div className="fv-row mb-10">
                            <label className="form-label fs-6 fw-bolder text-dark">
                                Rating:
                            </label>
                            <br/>
                            <input
                                type="number"
                                id="rating"
                                name="rating"
                                min="1"
                                max="5"
                                className={clsx('form-control form-control-lg',
                                    {'is-invalid': formik.touched.rating && formik.errors.rating},
                                    {'is-valid': formik.touched.rating && !formik.errors.rating}
                                )}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.rating}
                            />
                            {formik.errors.rating && formik.touched.rating && (
                                <div className='fv-plugins-message-container'>
                                    <span className='text-danger' role='alert'>{formik.errors.rating}</span>
                                </div>
                            )}
                        </div>

                        <div className="fv-row mb-10">
                            <label className="form-label fs-6 fw-bolder text-dark required">
                                Comment:
                            </label>
                            <br/>
                            <textarea
                                id="comment"
                                name="comment"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.comment}
                                className={clsx('form-control form-control-lg',
                                    {'is-invalid border border-danger': formik.touched.comment && formik.errors.comment},
                                    {'is-valid': formik.touched.comment && !formik.errors.comment}
                                )}
                            />
                            {formik.errors.comment && formik.touched.comment && (
                                <div className='fv-plugins-message-container'>
                                    <span className='text-danger' role='alert'>{formik.errors.comment}</span>
                                </div>
                            )}
                        </div>

                        <div className="fv-row mb-10">
                            <label className="form-label fs-6 fw-bolder text-dark required ">
                                Collaborators:
                            </label>
                            <br/>
                            <input
                                type="text"
                                id="collaborators"
                                name="collaborators"
                                className={clsx('form-control form-control-lg',
                                    {'is-invalid': formik.touched.collaborators && formik.errors.collaborators},
                                    {'is-valid': formik.touched.collaborators && !formik.errors.collaborators}
                                )}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.collaborators}
                            />
                            {formik.errors.collaborators && formik.touched.collaborators && (
                                <div className='fv-plugins-message-container'>
                                    <span className='text-danger' role='alert'>{formik.errors.collaborators}</span>
                                </div>
                            )}
                        </div>

                        <div className='d-flex justify-content-center'>
                            <div>
                                <button
                                    type="submit"
                                    className="btn btn-md"
                                >
                                    Submit Evaluation
                                </button>
                            </div>

                        </div>
                    </div>

                </form>

                {remainingTime > 0 && (
                    <p className="text-center mt-4">
                        Remaining Time: {Math.floor(remainingTime / 1000)} seconds
                    </p>
                )}

            </div>
        </div>
    );
};

export default EvaluateTender;
