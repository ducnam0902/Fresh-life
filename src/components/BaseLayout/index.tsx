import { Box } from '@mui/material';
import { Outlet } from 'react-router';
import Header from '../Header';

    const BaseLayout = () => {
      return (
        <Box>
            <Header />
            <Outlet/>
        </Box>
      );
    };

    export default BaseLayout;