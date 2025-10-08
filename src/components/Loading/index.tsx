import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
const Loading = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" zIndex={150}>
        <CircularProgress sx={{ color: '#A3DD83', width: '60px !important', height: '60px !important'}}/>
    </Box>
  )
}

export default Loading
