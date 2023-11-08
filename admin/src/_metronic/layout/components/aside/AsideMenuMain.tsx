/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../helpers'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
import {useAuth} from "../../../../app/modules/auth";

export function AsideMenuMain() {
    const intl = useIntl()
    const {currentUser, logout} = useAuth();
    return (
        <>
            <AsideMenuItem
                to='/dashboard'
                // icon='\_metronic\layout\favicon\favicon.png'
                title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
                //fontIcon='bi-app-indicator'
            />

            {currentUser.role === "admin" && (
                <AsideMenuItemWithSub to='*' title='Tenders'>
                    <AsideMenuItem to='/create-tender' title='Create tender'/>
                    <AsideMenuItem to='/all-tenders' title='All tenders'/>
                </AsideMenuItemWithSub>
            )}

            <AsideMenuItemWithSub to='*' title='Offers'>
                {(currentUser.role === "admin" || currentUser.role === "vendor") && (
                    <AsideMenuItem to='/offers-page' title='Create offer'/>
                )}
                {currentUser.role === "admin" && (
                    <AsideMenuItem to='/evaluations' title='Create evaluation'/>
                )}
            </AsideMenuItemWithSub>

            <AsideMenuItemWithSub to='*' title='User'>
                {currentUser.role === "admin" && (
                    <AsideMenuItem to='/users' title='Users'/>
                )}
                {(currentUser.role === "admin" || currentUser.role === "vendor") && (
                    <AsideMenuItem to='/my-profile' title='My profile'/>
                )}
            </AsideMenuItemWithSub>


            {/*<div className='menu-item'>
                <div className='menu-content pt-8 pb-2'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>
                </div>
            </div>
            */}
            {/*<AsideMenuItemWithSub
                to='/crafted/pages'
                title='Pages'
                fontIcon='bi-archive'
                icon='/media/icons/duotune/general/gen022.svg'
            >
                <AsideMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
                    <AsideMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true}/>
                    <AsideMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true}/>
                    <AsideMenuItem to='/crafted/pages/profile/campaigns' title='Campaigns' hasBullet={true}/>
                    <AsideMenuItem to='/crafted/pages/profile/documents' title='Documents' hasBullet={true}/>
                    <AsideMenuItem
                        to='/crafted/pages/profile/connections'
                        title='Connections'
                        hasBullet={true}
                    />
                </AsideMenuItemWithSub>

                <AsideMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
                    <AsideMenuItem
                        to='/crafted/pages/wizards/horizontal'
                        title='Horizontal'
                        hasBullet={true}
                    />
                    <AsideMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true}/>
                </AsideMenuItemWithSub>
            </AsideMenuItemWithSub>*/
            }
        </>
    )
}
