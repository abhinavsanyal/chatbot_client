import * as React from "react";
import { useSelector } from "react-redux";
import { setUser as setUserAction } from "reducers/authSlice";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import HistoryIcon from "@mui/icons-material/History";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const drawerWidth = 255;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Profile = ({ user, openProfilePopUp, setOpenProfilePopUp }) => {
  const handleClose = () => {
    setOpenProfilePopUp(false);
  };
  return (
    <Dialog
      open={openProfilePopUp}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"My Profile"}</DialogTitle>
      <DialogContent>
        <DialogContentText mb={2}>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            {user?.name?.length ? user.name[0] : null}
          </Avatar>
        </DialogContentText>
        <DialogContentText>Full Name: {user?.name}</DialogContentText>
        <DialogContentText>Email-id: {user?.email}</DialogContentText>
        <DialogContentText>Role: {user?.role}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenProfilePopUp(false)}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export const SideNav = ({ toggleIsAddDocument }) => {
  const user = useSelector((state) => state.auth.user.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setUserAction(null));
  };

  const [open, setOpen] = React.useState(true);
  const [openProfilePopUp, setOpenProfilePopUp] = React.useState(false);

  return (
    <>
      <Profile
        user={user}
        openProfilePopUp={openProfilePopUp}
        setOpenProfilePopUp={setOpenProfilePopUp}
      />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open && (
            <>
              <AutoFixHighIcon />
              <Typography ml={2} variant="h5">
                Sleek Wizard
              </Typography>
            </>
          )}
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "space-between",
            height: "100vh",
          }}
        >
          <div>
            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={() => setOpenProfilePopUp(true)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: deepOrange[500],
                        width: "25px",
                        height: "25px",
                        fontSize: "12px",
                      }}
                    >
                      {user?.name?.length ? user.name[0] : null}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={`My Profile` || ""}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={toggleIsAddDocument}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Add Documents`}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <HistoryIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Chat History`}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </div>
          <div>
            <Divider />
            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={handleLogout}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <PowerSettingsNewIcon sx={{ color: "red" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Logout`}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </div>
        </Box>
      </Drawer>
    </>
  );
};
