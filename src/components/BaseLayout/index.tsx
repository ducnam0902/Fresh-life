import { Box, Container } from "@mui/material";
import { Outlet } from "react-router";
import Header from "../Header";
import Loading from "../Loading";
import useLoading from "../../store/useLoading";

const BaseLayout = () => {
  const { isLoading } = useLoading();
  return (
    <Box sx={{ backgroundColor: "#fafafa", height: "100vh" }}>
      <Header />
      <Container maxWidth="xl" sx={{ padding: 4 }}>
        {isLoading && <Loading />}
        <Outlet />
      </Container>
    </Box>
  );
};

export default BaseLayout;
