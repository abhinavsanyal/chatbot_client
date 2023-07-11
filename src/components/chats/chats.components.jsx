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

  React.useEffect(() => {
    const chatScroll = document.getElementById("chat-scroll");
    if (!chatScroll) return;
    chatScroll.scrollTo(0, chatScroll.scrollHeight);
  }, [chatStore.chat_data]);

  return (
    <Box
      id="chat-scroll"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        overflow: "auto",
        pb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "800px",
          marginRight: "60px",
        }}
      >
        {chatStore?.chat_data?.map((chatData) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {chatData?.sender === "ME" ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "16px",
                  paddingBottom: "20px",
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
                <Box
                  sx={{
                    paddingBottom: "10px",
                  }}
                >
                  {chatData?.text || ""}
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "60px",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    marginLeft: "40px",
                  }}
                />
                <Card sx={{ width: "100%" }}>
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
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
