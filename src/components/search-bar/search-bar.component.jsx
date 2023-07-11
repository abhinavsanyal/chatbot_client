import { Container, InputAdornment, TextField, form } from "@mui/material";
import { setChatData, setIsFetchingAnswers } from "reducers/chat-slice";
import { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { RecordMessage } from "./record-message.component";

import { getTextToTextCompletion } from "../../api";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const chatStore = useSelector((state) => state.chat);

  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getTextToTextChats = async (event) => {
    event.preventDefault();
    try {
      dispatch(setIsFetchingAnswers(true));
      const res = await getTextToTextCompletion(searchTerm);
      dispatch(setChatData(res));
      setSearchTerm("");
    } catch (error) {
      console.log("Unable to get text answer : ", error);
    } finally {
      dispatch(setIsFetchingAnswers(false));
    }
  };

  return (
    <>
      {chatStore?.is_fetching_answers && <LinearProgress color="secondary" />}
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
        <form style={{ width: "100%" }} onSubmit={getTextToTextChats}>
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
        </form>
        <RecordMessage />
      </Container>
    </>
  );
};
