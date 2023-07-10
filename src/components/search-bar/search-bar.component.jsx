import { Container, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { RecordMessage } from "./record-message.component";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        mt: 20,
        mb: 5,
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
  );
};
