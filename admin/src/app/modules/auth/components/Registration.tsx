/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {PasswordMeterComponent} from '../../../../_metronic/assets/ts/components'
import {useAuth} from '../core/Auth'
import favicon from "../../../../_metronic/layout/favicon/favicon.png";
import AuthService from "../../../shared/services/api-client/auth.service";
import {showSuccessMessage} from "../../../shared/components/messages/success-createtender-message";

//comment
const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    changePassword: '',
    acceptTerms: false,
}

const registrationSchema = Yup.object().shape({
    firstname: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('First name is required'),
    email: Yup.string()
        .email('Wrong email format')
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Email is required'),
    lastname: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Last name is required'),
    password: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Password is required'),
    changePassword: Yup.string()
        .required('Password confirmation is required')
        .when('password', {
            is: (val: string) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
        }),
    acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

export function Registration() {
    const [loading, setLoading] = useState(false)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {saveAuth, setCurrentUser} = useAuth();

    const authService = new AuthService();

    const formik = useFormik({
        initialValues,
        validationSchema: registrationSchema,
        onSubmit: async (values, {setStatus, setSubmitting}) => {
            setLoading(true)
            setError(null);
            try {
                const {tokens: auth, user} = await authService.register(
                    values.email,
                    values.firstname,
                    values.lastname,
                    values.password,
                )
                showSuccessMessage('Successful registration!')
                saveAuth(auth)
                //   console.log(auth);
                // const {data: user} = await getUserByToken(auth.tokens.access)
                //setCurrentUser(user)
                setLoading(false)
            } catch (error) {
                console.error(error)
                saveAuth(undefined)
                setStatus('The registration details is incorrect')
                setSubmitting(false)
                setLoading(false)
            }
        },
    })

    useEffect(() => {
        PasswordMeterComponent.bootstrap()
    }, [])

    return (

        <div>

            <form

                className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
                noValidate
                id='kt_login_signup_form'
                onSubmit={formik.handleSubmit}
            >
                {/* begin::Heading */}
                <div className='mb-10 text-center'>
                    {/* begin::Title */}
                    <img alt='Logo' src={favicon} className='h-75px'/>
                    <br/>
                    <br/>
                    <br/>
                    <h1 className='text-dark mb-3'>Create an Account</h1>
                    {/* end::Title */}

                    {/* begin::Link */}
                    <div className='text-gray-400 fw-bold fs-4'>
                        Already have an account?
                        <Link to='/auth/login' className=' fw-bolder' style={{marginLeft: '5px'}}>
                            Sign in
                        </Link>
                    </div>
                    {/* end::Link */}
                </div>
                {/* end::Heading */}

                {/* begin::Action */}

                {/* end::Action */}

                {/* <div className='d-flex align-items-center mb-10'>*/}
                {/* <div className='border-bottom border-gray-300 mw-50 w-100'></div>*/}
                {/*  <span className='fw-bold text-gray-400 fs-7 mx-2'>OR</span>*/}
                {/* <div className='border-bottom border-gray-300 mw-50 w-100'></div> </div>*/}


                {formik.status && (
                    <div className='mb-lg-15 alert alert-danger'>
                        <div className='alert-text font-weight-bold'>{formik.status}</div>
                    </div>
                )}

                {/* begin::Form group Firstname */}
                <div className='row fv-row mb-7'>
                    <div className='col-xl-6'>
                        <label className='form-label fw-bolder text-dark fs-6'>First name</label>
                        <input
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value)
                            }}
                            placeholder='First name'
                            type='text'
                            autoComplete='off'
                            {...formik.getFieldProps('firstname')}
                            className={clsx(
                                'form-control form-control-lg',
                                {
                                    'is-invalid': formik.touched.firstname && formik.errors.firstname,
                                },
                                {
                                    'is-valid': formik.touched.firstname && !formik.errors.firstname,
                                }
                            )}
                        />
                        {formik.touched.firstname && formik.errors.firstname && (
                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                    <span role='alert'>{formik.errors.firstname}</span>
                                </div>
                            </div>
                        )}
                    </div>


                    <div className='col-xl-6'>
                        {/* begin::Form group Lastname */}
                        <div className='row fv-row mb-7'>
                            <label className='form-label fw-bolder text-dark fs-6'>Last name</label>
                            <input
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                }}
                                placeholder='Last name'
                                type='text'
                                autoComplete='off'
                                {...formik.getFieldProps('lastname')}
                                className={clsx(
                                    'form-control form-control-lg',

                                    {
                                        'is-invalid': formik.touched.lastname && formik.errors.lastname,
                                    },
                                    {
                                        'is-valid': formik.touched.lastname && !formik.errors.lastname,
                                    }
                                )}
                            />
                            {formik.touched.lastname && formik.errors.lastname && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>{formik.errors.lastname}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* end::Form group */}
                    </div>
                </div>
                {/* end::Form group */}

                {/* begin::Form group Email */}

                <div className='fv-row mb-7'>
                    <label className='form-label fw-bolder text-dark fs-6'>Email</label>
                    <input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        placeholder='Email'
                        type='email'
                        autoComplete='off'
                        {...formik.getFieldProps('email')}
                        className={clsx(
                            'form-control form-control-lg',
                            {'is-invalid': formik.touched.email && formik.errors.email},
                            {
                                'is-valid': formik.touched.email && !formik.errors.email,
                            }
                        )}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                                <span role='alert'>{formik.errors.email}</span>
                            </div>
                        </div>
                    )}
                </div>
                {/* end::Form group */}

                {/* begin::Form group Password */}
                <div className='mb-10 fv-row' data-kt-password-meter='true'>
                    <div className='mb-1'>
                        <label className='form-label fw-bolder text-dark fs-6'>Password</label>
                        <div className='position-relative mb-3'>
                            <input
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                type='password'
                                placeholder='Password'
                                autoComplete='off'
                                {...formik.getFieldProps('password')}
                                className={clsx(
                                    'form-control form-control-lg',
                                    {
                                        'is-invalid': formik.touched.password && formik.errors.password,
                                    },
                                    {
                                        'is-valid': formik.touched.password && !formik.errors.password,
                                    }
                                )}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>{formik.errors.password}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* begin::Meter */}
                        <div
                            className='d-flex align-items-center mb-3'
                            data-kt-password-meter-control='highlight'
                        >
                            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
                        </div>
                        {/* end::Meter */}
                    </div>
                    <div className='text-muted'>
                        Use 8 or more characters with a mix of letters, numbers & symbols.
                    </div>
                </div>
                {/* end::Form group */}

                {/* begin::Form group Confirm password */}
                <div className='fv-row mb-5'>
                    <label className='form-label fw-bolder text-dark fs-6'>Confirm Password</label>
                    <input
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                        }}
                        type='password'
                        placeholder='Password confirmation'
                        autoComplete='off'
                        {...formik.getFieldProps('changePassword')}
                        className={clsx(
                            'form-control form-control-lg',
                            {
                                'is-invalid': formik.touched.changePassword && formik.errors.changePassword,
                            },
                            {
                                'is-valid': formik.touched.changePassword && !formik.errors.changePassword,
                            }
                        )}
                    />
                    {formik.touched.changePassword && formik.errors.changePassword && (
                        <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                                <span role='alert'>{formik.errors.changePassword}</span>
                            </div>
                        </div>
                    )}
                </div>
                {/* end::Form group */}

                {/* begin::Form group */}
                <div className='fv-row mb-10'>
                    <div className='form-check form-check-custom'>
                        <input
                            className='form-check-input'
                            type='checkbox'
                            id='kt_login_toc_agree'
                            {...formik.getFieldProps('acceptTerms')}
                        />
                        <label
                            className='form-check-label fw-bold text-gray-700 fs-6'
                            htmlFor='kt_login_toc_agree'
                        >
                            I Agree the{' '}
                            <Link to='/auth/terms' className='ms-1'>
                                terms and conditions
                            </Link>
                            .
                        </label>
                        {formik.touched.acceptTerms && formik.errors.acceptTerms && (
                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                    <span role='alert'>{formik.errors.acceptTerms}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* end::Form group */}

                {/* begin::Form group */}
                <div className='text-center'>
                    <button
                        type='submit'
                        id='kt_sign_up_submit'
                        className='btn btn-lg  w-100  mb-5'
                        disabled={formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms}
                    >
                        {!loading && <span className=' indicator-label'>Submit</span>}
                        {loading && (
                            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
                        )}
                    </button>
                    <Link to='/auth/login'>
                        <button
                            type='button'
                            id='kt_login_signup_form_cancel_button'
                            className='btn btn-lg btn-light w-100 mb-5'
                        >
                            Cancel
                        </button>
                    </Link>
                </div>
                {/* end::Form group */}
            </form>
        </div>
    )
}
