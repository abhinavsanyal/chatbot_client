import { useState, useEffect, useMemo } from "react";
import "./App.css";
// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import instance from "api";
import routes from "routes";
import { Login } from "./components";
import Fab from "@mui/material/Fab";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const [appTheme, setAppTheme] = useState("dark");
  const toggleTheme = () => {
    setAppTheme(appTheme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    if (isLoggedIn && user) {
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.token}`;
    } else {
      delete instance.defaults.headers.common["Authorization"];
    }
  }, []);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        if (route.protected) {
          return (
            <Route
              exact
              path={route.route}
              element={isLoggedIn ? route.component : <Navigate to="/login" />}
              key={route.key}
            />
          );
        } else {
          return (
            <Route
              exact
              path={route.route}
              element={route.component}
              key={route.key}
            />
          );
        }
      }

      return null;
    });

  return (
    <div className="App">
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: appTheme,
          },
        })}
      >
        {/* <Fab variant="extended" size="medium">
          <Brightness4Icon />
        </Fab> */}
        <Fab
          size="small"
          sx={{ position: "absolute", top: 10, right: 10 }}
          color="primary"
          aria-label="add"
          onClick={toggleTheme}
        >
          <Brightness4Icon toggleTheme />
        </Fab>
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
