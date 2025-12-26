import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

import { LuLayoutDashboard } from "react-icons/lu";
import { LuCircleCheckBig } from "react-icons/lu";
import { IoMdReorder } from "react-icons/io";
import { LuChartSpline } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";

import FreshIcon from "../../assets/fresh-logo.png";
import { Link, NavLink, useNavigate } from "react-router";
import routes from "../../utils/routes";
import { Button, Drawer, IconButton, Stack, Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import useLoading from "../../store/useLoading";
import theme from "../../utils/theme";
import { useState } from "react";

const pages = [
  {
    name: "Dashboard",
    link: routes.dashboard,
    icon: (
      <LuLayoutDashboard
        size={20}
        color={theme.palette.primary.textMutedLight}
      />
    ),
  },
  {
    name: "Tasks",
    link: routes.tasks,
    icon: (
      <LuCircleCheckBig
        size={20}
        color={theme.palette.primary.textMutedLight}
      />
    ),
  },
  {
    name: "Expenses",
    link: routes.expenses,
    icon: (
      <LuChartSpline size={20} color={theme.palette.primary.textMutedLight} />
    ),
  },
  {
    name: "Charts",
    link: routes.charts,
    icon: (
      <LuChartSpline size={20} color={theme.palette.primary.textMutedLight} />
    ),
  },
];

function Header() {
  const user = useAuth();
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

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
      sx={{
        backgroundColor: theme.palette.primary.cardLight,
        paddingX: { xs: 1, md: 4 },
        zIndex: 10,
        borderBottom: `1px solid ${theme.palette.primary.borderLight}`,
        boxShadow: "none",
      }}
    >
      <Container maxWidth={"xl"}>
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
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
              sx={{
                fontWeight: "600",
                paddingRight: 2,
                color: theme.palette.primary.textLight,
                letterSpacing: 0.7,
                fontSize: {
                  xs: ".8rem",
                  lg: "1.5rem",
                },
              }}
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
                  color: theme.palette.primary.textMutedLight,
                  borderRadius: "1rem",
                  marginLeft: 3,
                  "&:hover": { color: theme.palette.primary.russianGreen },
                  "&.active": {
                    color: theme.palette.primary.russianGreen,
                    borderBottom: `2px solid ${theme.palette.primary.russianGreen}`,
                  },
                  "&.active button svg": {
                    color: `${theme.palette.primary.russianGreen} !important`,
                  },
                }}
              >
                <IconButton>{page.icon}</IconButton>
                <Typography
                  variant="h5"
                  sx={{ fontSize: "1rem", fontWeight: "500", paddingRight: 2 }}
                >
                  {page.name}
                </Typography>
              </Box>
            ))}
          </Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box sx={{ display: { xs: "flex", md: "none" }, m: 0, p: 0 }}>
              <Button onClick={toggleDrawer(true)}>
                <IoMdReorder
                  size={24}
                  color={theme.palette.primary.celadonGreen}
                />
              </Button>

              <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "600",
                      padding: 2,
                      pl: 4,
                      color: theme.palette.primary.textMutedLight,
                      letterSpacing: 0.7,
                      fontSize: {
                        xs: "1.2rem",
                      },
                      borderBottom: `1px solid ${theme.palette.primary.borderLight}`,
                    }}
                  >
                    Fresh Life
                  </Typography>
                </Box>
                <Box>
                  {pages.map((page) => (
                    <Box
                      onClick={toggleDrawer(false)}
                      component={NavLink}
                      to={page.link}
                      key={page.name}
                      display={"flex"}
                      alignItems="center"
                      sx={{
                        px: 6,
                        py: 1,
                        textDecoration: "none",
                        color: theme.palette.primary.textMutedLight,
                        "&:hover": {
                          color: theme.palette.primary.russianGreen,
                          backgroundColor: theme.palette.primary.cardLight,
                        },
                        "&.active": {
                          color: theme.palette.primary.textDark,
                          backgroundColor: theme.palette.primary.russianGreen,
                        },
                        "&.active button svg": {
                          color: `${theme.palette.primary.textDark} !important`,
                        },
                      }}
                    >
                      <IconButton>{page.icon}</IconButton>
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: "1rem",
                          fontWeight: "500",
                          paddingRight: 2,
                        }}
                      >
                        {page.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Drawer>
            </Box>
            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
              <Tooltip title="Open settings">
                <IconButton>
                  <Avatar alt="Remy Sharp" src={user?.photoURL ?? ""} />
                </IconButton>
              </Tooltip>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "0.8rem", md: "1rem" },
                  fontWeight: "600",
                  paddingRight: { xs: 0, md: 2 },
                  color: theme.palette.primary.textMutedLight,
                }}
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
                  color: theme.palette.primary.textMutedLight,
                  borderRadius: "1rem",
                  marginLeft: { xs: 1, md: 3 },
                  "&:hover": { backgroundColor: "#fff3" },
                  cursor: "pointer",
                }}
              >
                <IconButton>
                  <LuLogOut
                    size={20}
                    color={theme.palette.primary.celadonGreen}
                  />
                </IconButton>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    paddingRight: 2,
                    display: { xs: "none", md: "block" },
                  }}
                >
                  Logout
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
