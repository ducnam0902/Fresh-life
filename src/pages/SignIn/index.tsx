import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { auth } from "../../services/firebase";
import useLoading from "../../store/useLoading";
import routes from "../../utils/routes";
import theme from "../../utils/theme";
import FreshIcon from "../../assets/fresh-logo.png";
const googleProvider = new GoogleAuthProvider();

const SignIn: React.FC = () => {
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      // Redirect or handle success here
      navigate(routes.dashboard, { replace: true });
    } catch (error) {
      console.error(error);
      // Handle error here
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        position: "relative",
        background: "#f6f8f6",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: "-10%",
          top: "-10%",
          transform: "translate(0%, 0%)",
          height: "500px",
          width: "500px",
          borderRadius: "50%",
          backgroundColor: "lightgreen",
          filter: "blur(120px)",
          opacity: 0.5,
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "-10%",
          right: "-20%",
          top: 0,
          height: "500px",
          width: "500px",
          borderRadius: "50%",
          backgroundColor: "lightgreen",
          filter: "blur(120px)",
          transform: "translate(0%, 0%)",
          opacity: 0.7,
        }}
      ></Box>

      <Box
        sx={{ textAlign: "center", p: 4, width: '300px', bgcolor: "white", borderRadius: 3, borderColor: "#eee", boxShadow: 3 }}
      >
          <img
              src={FreshIcon}
              alt="Logo"
              style={{ width: 80, height: 80 }}
            />
        <Typography
          variant="h4"
          gutterBottom
          sx={{ mb: 3, color: theme.palette.primary.textLight, fontWeight: "500", fontSize: "28px" }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ mb: 4, fontWeight: "400", fontSize: "14åpx", color: "#0009" }}
        >
          Sign in to access your task and expense management dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoogleSignIn}
          size="large"
          startIcon={<FcGoogle size={16} color="#fff" />}
          sx={{ width: '100%' }}
        >
          Sign in with Google
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
