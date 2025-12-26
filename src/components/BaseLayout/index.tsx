import { Box, Container } from "@mui/material";
import { Outlet } from "react-router";
import Header from "../Header";
import Loading from "../Loading";
import useLoading from "../../store/useLoading";

const BaseLayout = () => {
  const { isLoading } = useLoading();
  return (
    <Box
      sx={{ backgroundColor: "#fafafa", height: "100vh", position: "relative" }}
    >
      <Header />
      <Container maxWidth="xl" sx={{ padding: 4 }}>
        {isLoading && (
          <Loading
            sx={{
              position: "absolute",
              width: "100%",
              top: 0,
              left: 0,
              opacity: "0.6",
              backgroundColor: "#ffffff",
            }}
          />
        )}
        <Outlet />
      </Container>
    </Box>
  );
};

export default BaseLayout;
