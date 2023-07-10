import { Container, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 20, mb: 5 }}>
      <TextField
        id="search"
        type="search"
        value={searchTerm}
        onChange={handleChange}
        sx={{ width: '100%', borderRadius: '10px' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
};
