import React, { FC } from 'react'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import type { Navigation } from '@/interfaces/navigation'
import { navigations as headerNavigations } from '@/components/navigation/navigation.data'
import { FooterSectionTitle } from '@/components/footer'

const courseMenu: Array<Navigation> = [
  {
    label: 'Tender 1',
    path: '#',
  },
  {
    label: 'Tender 2',
    path: '#',
  },
  {
    label: 'Tender 3',
    path: '#',
  },
  {
    label: 'Tender 4',
    path: '#',
  },
]

const pageMenu = headerNavigations

const companyMenu: Array<Navigation> = [
  { label: 'Contact Us', path: '#' },
  { label: 'Privacy & Policy', path: '#' },
  { label: 'Term & Condition', path: '#' },
  { label: 'FAQ', path: '#' },
]

interface NavigationItemProps {
  label: string
  path: string
}

const NavigationItem: FC<NavigationItemProps> = ({ label, path }) => {
  return (
    <p>
      {/* <MuiLink
        underline="hover"
        sx={{
          display: 'block',
          mb: 1,
          color: 'primary.contrastText',
        }}
      > */}
        {label}
      {/* </MuiLink> */}
    </p>
  )
}

const FooterNavigation: FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <FooterSectionTitle title="Tenders:" />
        {courseMenu.map(({ label, path }, index) => (
          <NavigationItem key={index + path} label={label} path={/* path */ '#'} />
        ))}
      </Grid>
      <Grid item xs={12} md={4}>
        <FooterSectionTitle title="Home" />
        {pageMenu.map(({ label, path }, index) => (
          <NavigationItem key={index + path} label={label} path={path} />
        ))}
      </Grid>
      <Grid item xs={12} md={4}>
        <FooterSectionTitle title="About:" />
        {/* {companyMenu.map(({ label, path }, index) => (
          <NavigationItem key={index + path} label={label} path={path} />
        ))} */}
        <p><i className="fas fa-home me-3 fa-bold text-black fw-bold"></i> Stefana Nemanje, IS
    58463, BA</p>
<p>
    <i className="fas fa-envelope me-3 fa-bold text-black fw-bold"></i>
    tenderspro@tenderpro.com
</p>
<p><i className="fas fa-phone me-3 fa-bold text-black fw-bold "></i> + 01 111 111 11</p>
<p><i className="fas fa-print me-3 fa-bold text-black fw-bold"></i>+ 02 222 222 22</p>
      </Grid>
    </Grid>
  )
}

export default FooterNavigation
