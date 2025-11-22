import { Box, Container } from "@mui/material";
import { Outlet } from "react-router";
import Header from "../Header";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../Loading";

const BaseLayout = () => {
  const user = useAuth();
  return (
    <Box sx={{ backgroundColor: "#fafafa", height: "100vh" }}>
      {!user && <Loading/> }
      <Header />
      <Container maxWidth="xl" sx={{ padding: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default BaseLayout;
