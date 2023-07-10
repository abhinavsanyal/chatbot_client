import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { SideNav } from "../side-nav/side-nav.component";
import { AvatarUi } from "../avatar-ui/avatar-ui.component";
import { SearchBar } from "../search-bar/search-bar.component";

export const Dashboard = () => {
  const [isShrinked, setIsShrinked] = React.useState(false);
  const onExpand = () => {
    setIsShrinked(false);
  };
  const onShrink = () => {
    setIsShrinked(true);
  };

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
          p: 3,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "100vh",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            setIsShrinked(!isShrinked);
          }}
        >
          {isShrinked ? "Expand" : "Shrink"}
        </Button>

        <AvatarUi onShrink={onShrink} isShrinked={isShrinked} />
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
