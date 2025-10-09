import { Box, IconButton, Paper, Typography } from '@mui/material'
import React from 'react'

interface IOverviewCount {
    title: string;
    count: number;
    icon: React.ReactNode;
    background: string;
    titleColor: string;
}
const OverviewCount = ({title, count, icon, background, titleColor }: IOverviewCount) => {
  return (
    <Paper elevation={1} sx={{ p: 2, pb: 3, borderRadius: 2,display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: background, color: titleColor }}>
        <Box>
            <Typography component="h3" sx={{fontSize: '2.125rem', lineHeight: '1.235', fontWeight: 600, letterSpacing: '0.00735rem'}}>{count}</Typography>
            <Typography component="h4" sx={{fontSize: '0.875rem', fontWeight: '400', lineHeight: '1.43', letterSpacing: '0.01071em'}}>{title}</Typography>
        </Box>
        <IconButton>
            {icon}
        </IconButton>
    </Paper>
  )
}

export default OverviewCount
