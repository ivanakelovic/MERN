/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {useFormik} from 'formik'
import {useAuth} from '../core/Auth'
import AuthService from "../../../shared/services/api-client/auth.service";
import favicon from "../../../../_metronic/layout/favicon/favicon.png";


const authService = new AuthService();


const loginSchema = Yup.object()
    .shape({
        email: Yup.string()
            .email('Wrong email format')
            .min(3, 'Minimum 3 symbols')
            .max(50, 'Maximum 50 symbols')
            .required('Email is required'),
        password: Yup.string()
            .min(3, 'Minimum 3 symbols')
            .max(50, 'Maximum 50 symbols')
            .required('Password is required'),
    })

const initialValues = {
    email: 'admin@demo.com',
    password: 'demo',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
    const [loading, setLoading] = useState(false)
    const {saveAuth, setCurrentUser} = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values, {setStatus, setSubmitting}) => {
            setLoading(true)
            setError(null);
            try {
                const {tokens: auth, user} = await authService.login(values.email, values.password)
                saveAuth(auth)
                // @ts-ignore
                setCurrentUser(user)
            } catch (error) {
                // setError(intl.formatMessage({id: 'AUTH.LOGIN.MESSAGE.ERROR'}));
                saveAuth(undefined)
                setStatus('The login detail is incorrect')
                setSubmitting(false)
                setLoading(false)
            }
        },
    })


    return (
        <div>


        <form

        style={{marginTop:'8%'}}
            className='form w-100'
            onSubmit={formik.handleSubmit}
            noValidate
            id='kt_login_signin_form'
        >
            {/* begin::Heading */}
            <div className='text-center mb-10'>
                <img alt='Logo' src={favicon} className='h-75px'/>
                <br/>
                <br/>
                <br/>
                <h1 className='text-dark mb-3'>Sign In to TenderPro</h1>
                <div className='text-nowrap text-gray-400 fw-bold fs-4'>
                    New Here?{' '}
                    <Link to='/auth/registration' className=' fw-bolder '>
                        Create an Account
                    </Link>
                </div>
            </div>
            {/* begin::Heading */}

            {/*

      admin#demo. prikaz na ekranu sakriven

      {formik.status ? (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>{formik.status}</div>
          </div>
      ) : (
          <div className='mb-10 bg-light-info p-8 rounded'>
            <div className='text-info'>
              Use account <strong>admin@demo.com</strong> and password <strong>demo</strong> to
              continue.
            </div>
          </div>
      )}

*/}
            {/* begin::Form group */}
            <div className='fv-row mb-10'>
                <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
                <input
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    value={email}
                    placeholder='Email'
                    {...formik.getFieldProps('email')}
                    className={clsx(
                        'form-control form-control-lg',
                        {'is-invalid': formik.touched.email && formik.errors.email},
                        {
                            'is-valid': formik.touched.email && !formik.errors.email,
                        }
                    )}
                    type='email'
                    name='email'
                    autoComplete='off'
                />
                {formik.touched.email && formik.errors.email && (
                    <div className='fv-plugins-message-container'>
                        <span role='alert'>{formik.errors.email}</span>
                    </div>
                )}
            </div>
            {/* end::Form group */}

            {/* begin::Form group */}
            <div className='fv-row mb-10'>
                <div className='d-flex  justify-content-between mt-n5 '>
                    <div className='d-flex text-nowrap flex-stack mb-2   text-gray-400 fw-bold fs-4'>
                        {/* begin::Label */}
                        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
                        {/* end::Label */}
                        {/* begin::Link */}
                        <Link
                            to='/auth/forgot-password'
                            className=' fw-bolder  '
                            style={{ fontSize: '1rem', marginLeft: '5px' }}
                        >
                            Forgot Password ?
                        </Link>
                        {/* end::Link */}
                    </div>
                </div>
                <input
                    type='password'
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    value={password}
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
            {/* end::Form group */}

            {/* begin::Action */}
            <div className='text-center'>
                <button
                    type='submit'
                    id='kt_sign_in_submit'
                    className='btn btn-lg w-100 mb-5'
                    disabled={formik.isSubmitting || !formik.isValid}
                >
                    {!loading && <span className='indicator-label'>Continue</span>}
                    {loading && (
                        <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-5'></span>
            </span>
                    )}
                </button>


            </div>
        </form>
        </div>

    )
}
