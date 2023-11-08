/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {useEffect} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ForgotPassword} from './components/ForgotPassword'
import {Login} from './components/Login'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import favicon from "../../../_metronic/layout/favicon/favicon.png"


const AuthLayout = () => {
    useEffect(() => {
        document.body.classList.add('bg-body')
        return () => {
            document.body.classList.remove('bg-body')
        }
    }, [])
    return (
        <div className='d-flex'>
            <div
                className='col-md-5 col-lg-7 d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
                style={{
                    backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/index_picture.png')})`,
                }}
            >
            </div>
               <div className='col-sm-12 col-md-7 col-lg-5' style={{marginRight: "10rem"}}>
                <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>


                    <a href='#' className='mb-12'>
                        {/*<img alt='Logo' src={favicon} className='h-75px'/>*/}
                    </a>



                    <div className='w-lg-500px  shadow-sm rounded p-10 p-lg-15 bg-body mx-auto'>
                        <Outlet/>
                    </div>
                </div>
        </div>


        </div>
    )
}

const AuthPage = () => (
    <Routes>
        <Route element={<AuthLayout/>}>
            <Route path='login' element={<Login/>}/>
            <Route path='registration' element={<Registration/>}/>
            <Route path='forgot-password' element={<ForgotPassword/>}/>

            <Route index element={<Login/>}/>

        </Route>

    </Routes>
)

export {AuthPage}


