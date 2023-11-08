import React, { FC } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { data } from './feature.data'

import Meeting from "./meeting.jpeg";
import Meeting1 from "./meeting1.jpg"
import Contract1 from "./contract.jpg"
import Contract from "./contract1.jpg"


interface LinearProgressProps {
  order: number
}

const BorderLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== 'color',
})<LinearProgressProps>(({ theme, order }) => ({
  height: 6,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    ...(order === 1 && {
      backgroundColor: '#f303ff',
    }),
    ...(order === 2 && {
      backgroundColor: '#26e8bd',
    }),
    ...(order === 3 && {
      backgroundColor: '#0063ff',
    }),
  },
}))

const HomeFeature: FC = () => {
  return (
    
    
    <div></div>
  );
}

export default HomeFeature
