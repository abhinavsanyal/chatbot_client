import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCompany } from "reducers/app-config-slice";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { SideNav } from "../side-nav/side-nav.component";
import { AvatarUi } from "../avatar-ui/avatar-ui.component";
import { SearchBar } from "../search-bar/search-bar.component";
import { Chats } from "../chats/chats.components";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FileUpload from "./FileUpload";
import { createEmbeddingsAndIngestToVectorDB } from "api";

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
  const [isShrinked, setIsShrinked] = React.useState(false);
  const [isAddDocument, setIsAddDocument] = React.useState(false);
  const onExpand = () => {
    setIsShrinked(false);
  };
  const notify = () => toast("Wow so easy!");
  const onShrink = () => {
    setIsShrinked(true);
  };

  const uploadFileToServer = (file) => {
    // use formData to send file to server using createEmbeddingsAndIngestToVectorDB
    const formData = new FormData();
    formData.append("file", file);
    return createEmbeddingsAndIngestToVectorDB(formData);
  };

  const toggleIsAddDocument = () => {
    setIsAddDocument(!isAddDocument);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Side navigation panel */}
      <SideNav toggleIsAddDocument={toggleIsAddDocument} />
      {/* Main right container */}

      {isAddDocument && (
        <Box
          component="main"
          sx={{
            display: "flex",
            p: 2,
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100vh",
          }}
        >
          <FileUpload
            multiple={true}
            name="example-upload"
            maxSize={300000}
            onUpload={uploadFileToServer}
            notify={notify}
            label="Upload Files"
          />
        </Box>
      )}

      {!isAddDocument && (
        <Box
          component="main"
          sx={{
            display: "flex",
            p: 2,
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100vh",
          }}
        >
          <CompanySelector />
          {/* <AvatarUi /> */}
          {/* <Button
          variant="outlined"
          onClick={() => {
            setIsShrinked(!isShrinked);
          }}
        >
          {isShrinked ? "Expand" : "Shrink"}
        </Button> */}

          <AvatarUi onShrink={onShrink} isShrinked={isShrinked} />
          <Chats />
          <SearchBar />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </Box>
      )}
    </Box>
  );
};
