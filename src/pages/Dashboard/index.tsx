import { Button } from "@mui/material";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router";
import routes from "../../utils/routes";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await signOut(auth);
      navigate(routes.signIn);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div>
      <Button onClick={handleSignout}>Sign out</Button>
    </div>
  );
};

export default Dashboard;
