import * as React from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

export const Chats = () => {
  const chatStore = useSelector((state) => state.chat);
  const user = useSelector((state) => state.auth.user.user);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        overflow: "auto",
        pb:2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: "800px",
        }}
      >
        {chatStore?.chat_data?.map((chatData) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: 2,
            }}
          >
            {chatData?.sender === "ME" ? (
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
            ) : (
              <Box
                sx={{
                  marginLeft: 3,
                }}
              />
            )}
            <Card>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {chatData?.text || ""}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
