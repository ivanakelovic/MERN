import React, { FC } from 'react'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { StyledButton } from '../styled-button'

const HomeNewsLetter: FC = () => {
  return (
    <Box sx={{ backgroundColor: 'background.paper', py: { xs: 8, md: 10 } }}>
      <Container>
        <Box
          sx={{
            backgroundColor: 'text.secondary',
            borderRadius: 10,
            py: { xs: 4, md: 10 },
            px: { xs: 4, md: 8 },
            textAlign: 'center',
            color: 'white'
          }}
        >
          <Typography variant="h1"  component="h2" sx={{ mb: 1, fontSize: { xs: 32, md: 42 } }}>
           Go to TenderPro site
          </Typography>
          <Typography  sx={{ mb: 6 }}>To find latest Tenders and Tenders Offers </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-around',
              width: { xs: '100%', md: 560 },
              mx: 'auto',
            }}
          >
            {/* <InputBase
              sx={{
                backgroundColor: 'background.paper',
                borderRadius: 3,
                width: '100%',
                height: 48,
                px: 2,
                mr: { xs: 0, md: 3 },
                mb: { xs: 2, md: 0 },
              }}
              placeholder="Enter your Email Address"
            /> */}
            <Box>
              <a href="http://localhost/3000">
              <StyledButton disableHoverEffect size="large">
                Try it now
              </StyledButton>
              </a>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default HomeNewsLetter
