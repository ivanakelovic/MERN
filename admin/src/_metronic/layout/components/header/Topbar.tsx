import clsx from 'clsx'
import React, {FC, useEffect, useState} from 'react'
import {
    HeaderNotificationsMenu,
    HeaderUserMenu,
    QuickLinks,
    Search,
    ThemeModeSwitcher,
} from '../../../partials'
import {useLayout} from '../../core'
import {getProfilePicture} from "../../../../app/pages/userInformation/UserInformation";
import {useAuth} from "../../../../app/modules/auth";


const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
    toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
    toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
    toolbarButtonIconSizeClass = 'svg-icon-1'

const Topbar: FC = () => {
    const {config} = useLayout()
    const {currentUser, logout} = useAuth();
    const [picture, setPicture] = useState(null);

    useEffect(() => {
        getProfilePicture(currentUser.documents)
            .then((profilePictureData) => {
                setPicture(profilePictureData);
            });
    })

    return (
        <div className='d-flex align-items-stretch flex-shrink-0'>

            {/* begin::Theme mode */}
            <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
                <ThemeModeSwitcher
                    toggleBtnClass={clsx('btn-active-light-primary btn-custom', toolbarButtonHeightClass)}
                />
            </div>
            {/* end::Theme mode */}

            {/* begin::User */}
            <div
                className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
                id='kt_header_user_menu_toggle'
            >
                {/* begin::Toggle */}
                <div
                    className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
                    data-kt-menu-trigger='click'
                    data-kt-menu-attach='parent'
                    data-kt-menu-placement='bottom-end'
                    data-kt-menu-flip='bottom'
                >
                    <img src={picture} alt='Profile picture'/>
                </div>
                <HeaderUserMenu/>
                {/* end::Toggle */}
            </div>
            {/* end::User */}

        </div>
    )
}

export {Topbar}
