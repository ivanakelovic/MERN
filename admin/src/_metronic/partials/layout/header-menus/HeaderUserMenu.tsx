/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../../app/modules/auth'
import {Languages} from './Languages'
import {toAbsoluteUrl} from '../../../helpers'
import UserInformation from "../../../../app/pages/userInformation/UserInformation";
import {getProfilePicture} from "../../../../app/pages/userInformation/UserInformation";


const HeaderUserMenu: FC = () => {
    const {currentUser, logout} = useAuth();
    const [picture,setPicture]=useState(null);

    useEffect(()=>{
        getProfilePicture(currentUser.documents)
            .then((profilePictureData) => {
                setPicture(profilePictureData);
            });
    })

    return (
        <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
            data-kt-menu='true'
        >
            <div className='menu-item px-3'>
                <div className='menu-content d-flex align-items-center px-3'>
                    <div className='symbol symbol-50px me-5'>
                        <img alt='Profile photo' src={picture}/>
                    </div>

                    <div className='d-flex flex-column'>
                        <div className='fw-bolder d-flex align-items-center fs-5'>
                            {currentUser?.firstName} {currentUser?.lastName}
                            <span className='badge badge-light-primary fw-bolder fs-8 px-2 py-1 ms-2'>{currentUser?.role}</span>
                        </div>
                        <Link to='/my-profile' className='fw-bold text-muted text-hover-primary fs-7'>
                            {currentUser?.email}
                        </Link>

                    </div>
                </div>
            </div>

            <div className='separator my-2'></div>

            <div className='menu-item px-5'>
                <a onClick={logout} className='menu-link px-5'>
                    Sign Out
                </a>
            </div>

        </div>
    )
}

export {HeaderUserMenu}
