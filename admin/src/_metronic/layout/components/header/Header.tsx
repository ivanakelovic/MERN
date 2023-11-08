
import React, { FC } from 'react';
import { MenuInner } from './MenuInner';

const Header: FC = () => {
  return (
    <div

      className='header-menu align-items-stretch'
      style={{
        width: '100%',
        height:'80px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '3px',
        overflow: 'auto',
        backgroundColor: 'whitesmoke',
        border: '1px solid red',
        borderRadius: ' 20px',
       

    
      }}
      data-kt-drawer='true'
      data-kt-drawer-name='header-menu'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'250px', '300px': '250px'}"
      data-kt-drawer-direction='end'
      data-kt-drawer-toggle='#kt_header_menu_mobile_toggle'
      data-kt-swapper='true'
      data-kt-swapper-mode='prepend'
      data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_nav'}"
    >
      <div
        className='menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch'
        id='#kt_header_menu'
        data-kt-menu='true'
      >
        <div className='header-menu align-items-stretch bg-gray position-relative text-center'>
          <h1 className='p-4 fw-bold' style={{ letterSpacing:'2px'}}>
            Welcome to Tender <span style={{ color: 'red' }}>Pro</span> Application!
          </h1>
        </div>

        <MenuInner />

        <div style={{ color: 'black' }}>
          
          <p style={{marginTop:'20px', letterSpacing: '1px'}}>
            Navigating Tenders Effortlessly with Tender <span style={{ color: 'red' }}>Pro</span> Application.
            Tender <span style={{ color: 'red' }}>Pro</span> Application is here to elevate your tender experience. Join us to conquer tender.
          </p>
        </div>
      </div>
    </div>
  );
}

export { Header };
