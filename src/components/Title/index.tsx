import { Box, Typography } from '@mui/material'
import React from 'react'

interface ITitle {
    title: string,
    subTitle: string,
    children?: React.ReactNode
}

const Title = ({title, subTitle, children}: ITitle) => {
  return (
    <Box mb={4} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} textAlign={'center'}>
      <Box>
        <Typography variant='h1' sx={{ fontSize: '2.125rem', fontWeight: 600, color: '#6ba259', lineHeight: '1.235', marginBottom: 2, textAlign: 'left', letterSpacing: '0.00735rem'}}>{title}</Typography>
        <Typography variant='h2' sx={{ fontWeight: 400, fontSize: '1rem', lineHeight: '1.5', color: '#0009'}}>{subTitle}</Typography>
      </Box>
      <Box>
        {children}
      </Box>
    </Box>
  )
}

export default Title
