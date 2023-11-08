import React, { FC } from 'react'
import Box from '@mui/material/Box'
import { StyledButton } from '@/components/styled-button'
import { Link } from 'react-scroll'

const AuthNavigation: FC = () => {
  return (
    <Box sx={{ '& button:first-child': { mr: 2 } }}>
      <a href="http://localhost/3000">
        <StyledButton disableHoverEffect={true}>Go to TenderPro</StyledButton>
      </a>
      
    </Box>
  )
}

export default AuthNavigation
