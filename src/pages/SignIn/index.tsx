import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { GrGoogle } from "react-icons/gr";
import { useNavigate } from "react-router";
import { auth } from "../../services/firebase";
import useLoading from "../../store/useLoading";
import routes from "../../utils/routes";

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
        background:
          "linear-gradient(135deg, rgb(107, 162, 89) 0%, rgb(163, 221, 131) 50%, rgb(247, 243, 154) 100%)",
      }}
    >
      <Box
        sx={{ textAlign: "center", p: 6, bgcolor: "white", borderRadius: 3 }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#6ba259', fontWeight: '500' }}>
          Welcome Back
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 4, fontWeight: '400', fontSize: '16px', color: "#0009" }}>
          Sign in to access your task and expense management dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoogleSignIn}
          size="large"
          startIcon={<GrGoogle size={16} color="#fff"/>}
        >
          Sign in with Google
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
