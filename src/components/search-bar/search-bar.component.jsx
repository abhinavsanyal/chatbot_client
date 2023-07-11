import { useEffect } from "react";
import { Container, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { RecordMessage } from "./record-message.component";

export const SearchBar = () => {
  const chatStore = useSelector((state) => state.chat);

  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      {chatStore?.is_fetching_answers && (
        <LinearProgress color="secondary" sx={{ height: 12 }} />
      )}
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mt: 1,
          mb: 2,
        }}
      >
        <TextField
          fullWidth
          id="search"
          type="search"
          value={searchTerm}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <RecordMessage />
      </Container>
    </>
  );
};
