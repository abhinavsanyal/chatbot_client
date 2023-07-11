import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import "./file-upload.styled.scss";

const styles = {
  inputWrapper: "input-wrapper",
  inputCover: "input-cover",
  helpText: "help-text",
  fileName: "file-name",
  fileNameStretch: "file-name spacer",
  fileExt: "file-ext",
  fileDrag: "file-drag",
  input: "input",
  loader: "loader",
  disabled: "disabled",
  loading: "loading",
  loaderItem: "loader-item",
  spacer: "spacer",
  button: "button",
  hover: "hover",
  imagePreview: "image-preview",
  preview: "preview",
  previewItem: "preview-item",
  previews: "previews",
};

const getExtFromType = (type) => {
  const parts = type.split("/");
  return parts[parts.length - 1];
};
const getExtFromName = (name) => {
  const parts = name.split(".");
  return parts[parts.length - 1];
};

const Loader = () => {
  return (
    <div className={styles.loader}>
      <span className={styles.loaderItem} />
      <span className={styles.loaderItem} />
      <span className={styles.loaderItem} />
    </div>
  );
};

const FilePreview = ({ data, onRemove, onUpload }) => {
  const [loading, setLoading] = useState(true);
  const [src, setSrc] = useState(null);
  const [type, setType] = useState(null);

  const loadData = (file) => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    const fileType = file.type.match("text")
      ? "text"
      : file.type.match("image")
      ? "image"
      : file.type;
    setType(fileType);
    reader.onload = (e) => {
      setSrc(e.target.result);
      setLoading(false);
    };
    if (fileType === "text") {
      reader.readAsText(file);
    } else if (fileType === "image") {
      reader.readAsDataURL(file);
    } else {
      setSrc(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(data);
  }, [data]);

  const classes = [styles.previewItem, data.loading ? styles.disabled : ""]
    .join(" ")
    .trim();

  return (
    <Card sx={{ marginBottom: "10px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: "10px 5px",
          alignItems: "center",
        }}
      >
        {data.loading && <Loader />}
        {loading ? "loading data..." : null}
        {!loading &&
          !data.loading &&
          (type === "text" ? (
            <pre className={styles.preview}>{src}</pre>
          ) : type === "image" ? (
            <img alt="preview" src={src} className={styles.imagePreview} />
          ) : (
            <pre className={styles.preview}>no preview</pre>
          ))}
        <div className={styles.fileNameStretch}>{data.name}</div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Button variant="outlined" onClick={onRemove}>
            remove
          </Button>

          <Button variant="outlined" onClick={onUpload}>
            upload
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

const FileUpload = ({ maxSize, name, multiple, label, onUpload, notify }) => {
  const [fileList, setFileList] = useState([]);
  const [hoverState, setHoverState] = useState(null);
  const inputRef = useRef();

  const handleDragOver = (e) => {
    if ("preventDefault" in e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setHoverState(e.type === "dragover" ? styles.hover : null);
  };

  const handleFileSelect = (e) => {
    handleDragOver(e);
    const files = e.target.files || e.dataTransfer.files;
    setFileList(Array.from(files));
  };

  const removeItem = (index) => {
    setFileList((prevFileList) => {
      const newFileList = [...prevFileList];
      newFileList.splice(index, 1);
      return newFileList;
    });
  };

  const uploadFile = (file, index) => {
    const newFileList = [...fileList];
    newFileList[index].loading = true;
    setFileList(newFileList);
    if (typeof file === "file" || !("size" in file)) {
      throw new Error("No file size");
    }
    return onUpload(file).then(() => {
    //   notify();
      removeItem(index);
    });
  };

  const selectFile = (e) => {
    e.preventDefault();
    inputRef.current.click(e);
  };

  const dragClasses = [styles.fileDrag, hoverState].join(" ").trim();

  const fileExt =
    fileList.length === 1
      ? fileList[0].type
        ? `.${getExtFromType(fileList[0].type)}`
        : `.${getExtFromName(fileList[0].name)}`
      : null;

  const fileNames =
    fileList.length > 1
      ? `${fileList.length} Files`
      : fileList.length === 1
      ? fileList[0].name.replace(fileExt, "")
      : "No file chosen";

  return (
    <div>
      <input type="hidden" name={`${name}:maxSize`} value={maxSize} />
      <Card
        onDragOver={handleDragOver}
        onDragLeave={handleDragOver}
        onDrop={handleFileSelect}
        sx={{ maxWidth: 600, marginBottom: "60px" }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            <input
              type="file"
              tabIndex="-1"
              ref={inputRef}
              className={styles.input}
              name={name}
              multiple={multiple}
              onChange={handleFileSelect}
            />
          </Typography>
          <Typography variant="h5" component="div">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "40px",
                alignItems: "center",
              }}
            >
              <Button type="button" variant="outlined" onClick={selectFile}>
                Choose Files
              </Button>
              <Typography>
                {fileNames}
                {fileExt}
              </Typography>
            </Box>
            <Box
              sx={{
                paddingTop: "40px",
              }}
            >
              <Typography>or drop files here</Typography>
            </Box>
          </Typography>
        </CardContent>
      </Card>
      <Button
        type="button"
        variant="outlined"
        onClick={() =>
          fileList.forEach((file, index) => uploadFile(file, index))
        }
      >
        Ingest into knowledge base
      </Button>
      <div className="pb-4" />
      <div className={styles.previews}>
        {fileList.map((file, index) => (
          <FilePreview
            key={index}
            data={file}
            onRemove={() => removeItem(index)}
            onUpload={() => uploadFile(file, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
