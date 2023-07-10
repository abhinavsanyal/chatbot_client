import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCompany } from "reducers/app-config-slice";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

import { SideNav } from "../side-nav/side-nav.component";
import { AvatarUi } from "../avatar-ui/avatar-ui.component";
import { SearchBar } from "../search-bar/search-bar.component";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const CompanySelector = () => {
  const appConfigStore = useSelector((state) => state.appConfig);
  const dispatch = useDispatch();

  const onCompanyChange = (event) => {
    dispatch(setCompany(event.target.value));
  };

  return (
    <Box
      sx={{
        top: "8px",
        left: "270px",
        width: "100%",
        maxWidth: "200px",
      }}
    >
      {appConfigStore?.companies?.length && (
        <FormControl fullWidth size="small" sx={{ height: 0 }}>
          <InputLabel id="demo-simple-select-label">Company</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue=""
            value={appConfigStore?.selected_company}
            onChange={onCompanyChange}
          >
            {appConfigStore?.companies?.map((companyName, idx) => (
              <MenuItem key={idx} value={companyName || ""}>
                {companyName || ""}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export const Dashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Side navigation panel */}
      <SideNav />
      {/* Main right container */}

      <Box
        component="main"
        sx={{
          display: "flex",
          flexGrow: 1,
          p: 2,
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100vh",
        }}
      >
        <CompanySelector />
        <AvatarUi />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <SearchBar />
      </Box>
    </Box>
  );
};
