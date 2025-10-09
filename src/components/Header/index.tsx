import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

import { LuLayoutDashboard } from "react-icons/lu";
import { LuCircleCheckBig } from "react-icons/lu";

import { LuChartSpline } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";

import FreshIcon from "../../assets/fresh-logo.png";
import { Link, NavLink, useNavigate } from "react-router";
import routes from "../../utils/routes";
import { IconButton, Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import useLoading from "../../store/useLoading";

const pages = [
  {
    name: "Dashboard",
    link: routes.dashboard,
    icon: <LuLayoutDashboard size={20} color="#fff" />,
  },
  {
    name: "Tasks",
    link: routes.tasks,
    icon: <LuCircleCheckBig size={20} color="#fff" />,
  },
  {
    name: "Expenses",
    link: routes.expenses,
    icon: <LuChartSpline size={20} color="#fff" />,
  },
  {
    name: "Charts",
    link: routes.charts,
    icon: <LuChartSpline size={20} color="#fff" />,
  },
];

function Header() {
  const user = useAuth();
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      navigate(routes.signIn);
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#6BA259", paddingX: 4, zIndex: 10 }}
    >
      <Container maxWidth={"xl"} >
        <Toolbar disableGutters>
          <Box
            component={Link}
            to={routes.dashboard}
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img
              src={FreshIcon}
              alt="Logo"
              style={{ width: 40, height: 40, marginRight: 10 }}
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: "600", paddingRight: 2 }}
            >
              Fresh Life
            </Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "flex-end" },
            }}
          >
            {pages.map((page) => (
              <Box
                component={NavLink}
                to={page.link}
                key={page.name}
                display={"flex"}
                alignItems="center"
                sx={{
                  textDecoration: "none",
                  color: "white",
                  borderRadius: "1rem",
                  marginLeft: 3,
                  "&:hover": { backgroundColor: "#fff3" },
                  "&.active": { backgroundColor: "#fff3" },
                }}
              >
                <IconButton>{page.icon}</IconButton>
                <Typography
                  variant="h5"
                  sx={{ fontSize: "1rem", fontWeight: "600", paddingRight: 2 }}
                >
                  {page.name}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ px: 2 }}>
                <Avatar alt="Remy Sharp" src={user?.photoURL ?? ""} />
              </IconButton>
            </Tooltip>
            <Typography
              variant="h5"
              sx={{ fontSize: "1rem", fontWeight: "600", paddingRight: 2 }}
            >
              {user ? user.displayName : "Guest"}
            </Typography>
          </Box>
          <Box>
            <Box
              display={"flex"}
              alignItems="center"
              onClick={handleSignout}
              sx={{
                textDecoration: "none",
                color: "white",
                borderRadius: "1rem",
                marginLeft: 3,
                "&:hover": { backgroundColor: "#fff3" },
                cursor: "pointer",
              }}
            >
              <IconButton>
                <LuLogOut size={20} color="#fff" />
              </IconButton>
              <Typography
                variant="h5"
                sx={{ fontSize: "1rem", fontWeight: "600", paddingRight: 2 }}
              >
                Logout
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
