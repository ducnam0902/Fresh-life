import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router';
import Header from '../Header';

    const BaseLayout = () => {
      return (
        <Box sx={{backgroundColor: '#fafafa', height: '100vh'}}>
            <Header />
            <Container maxWidth="xl" sx={{padding: 4}}>
            <Outlet/>
            </Container>
        </Box>
      );
    };

    export default BaseLayout;