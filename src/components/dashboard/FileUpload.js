

import React, { useState, useEffect, useRef } from 'react';
import "./file-upload.styled.scss"

const styles = {
    inputWrapper: 'input-wrapper',
    inputCover: 'input-cover',
    helpText: 'help-text',
    fileName: 'file-name',
    fileNameStretch: 'file-name spacer',
    fileExt: 'file-ext',
    fileDrag: 'file-drag',
    input: 'input',
    loader: 'loader',
    disabled: 'disabled',
    loading: 'loading',
    loaderItem: 'loader-item',
    spacer: 'spacer',
    button: 'button',
    hover: 'hover',
    imagePreview: 'image-preview',
    preview: 'preview',
    previewItem: 'preview-item',
    previews: 'previews'
  };
const uploadFileToServer = (file) => {
  const delay = file.size/100; 
  return new Promise((resolve,reject)=> {
    setTimeout(()=>{
          resolve();
    }, delay);
  });
};

const getExtFromType = (type) => {
  const parts = type.split('/');
  return parts[parts.length - 1];
};
const getExtFromName = (name) => {
  const parts = name.split('.');
  return parts[parts.length - 1];
};

const Loader = () => {
  return <div className={styles.loader}>
    <span className={styles.loaderItem}/>
    <span className={styles.loaderItem}/>
    <span className={styles.loaderItem}/>
  </div>
}

const FilePreview = ({data, onRemove, onUpload}) => {
  const [loading, setLoading] = useState(true);
  const [src, setSrc] = useState(null);
  const [type, setType] = useState(null);

  const loadData = (file) => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    const fileType = file.type.match('text') ? 'text' :
                     file.type.match('image') ? 'image' : file.type;
    setType(fileType);
    reader.onload = (e) => {
      setSrc(e.target.result);
      setLoading(false);
    }
    if (fileType === 'text') {
      reader.readAsText(file);
    } else if (fileType === 'image') {
      reader.readAsDataURL(file);
    } else {
      setSrc(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(data);
  }, [data]);

  const classes = [
    styles.previewItem, 
    data.loading ? styles.disabled:''
  ].join(' ').trim();

  return (
    <div className={classes}>
      {data.loading && <Loader />}
      {loading ? 'loading data...' : null}
      {!loading && !data.loading && (
        type === 'text' ? <pre className={styles.preview}>{src}</pre> :
        type === 'image' ? <img alt='preview' src={src} className={styles.imagePreview}/> :
        <pre className={styles.preview}>no preview</pre>
      )}
      <div className={styles.fileNameStretch}>{data.name}</div>
      <button className={styles.button} onClick={onRemove}>remove</button>
      <button className={styles.button} onClick={onUpload}>upload</button>
    </div>
  );
};

const FileUpload = ({maxSize, name, multiple, label, onUpload}) => {
  const [fileList, setFileList] = useState([]);
  const [hoverState, setHoverState] = useState(null);
  const inputRef = useRef();

  const handleDragOver = (e) => {
    if ('preventDefault' in e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setHoverState(e.type === 'dragover' ? styles.hover : null);
  };

  const handleFileSelect = (e) => {
    handleDragOver(e);
    const files = e.target.files || e.dataTransfer.files;
    setFileList(Array.from(files));
  };
  
  const removeItem = (index) => {
    setFileList(prevFileList => {
      const newFileList = [...prevFileList];
      newFileList.splice(index, 1);
      return newFileList;
    });
  };

  const uploadFile = (file, index) => {
    const newFileList = [...fileList];
    newFileList[index].loading = true;
    setFileList(newFileList);
    if (typeof file === 'file' || !('size' in file)) {
      throw new Error('No file size');
    }
    return onUpload(file).then(() => {
      removeItem(index);
    });
  };

  const selectFile = (e) => {
    e.preventDefault();
    inputRef.current.click(e);
  };

  const dragClasses = [
    styles.fileDrag,
    hoverState
  ].join(' ').trim();

  const fileExt = fileList.length === 1 ?
    (fileList[0].type ? `.${getExtFromType(fileList[0].type)}` : `.${getExtFromName(fileList[0].name)}`) :
    null;
  
  const fileNames = fileList.length > 1 ? `${fileList.length} Files` :
    fileList.length === 1 ? fileList[0].name.replace(fileExt, '') :
    'No file chosen';

  return (
    <div>
      <input type='hidden' name={`${name}:maxSize`} value={maxSize} />
      <label>
        <span>{label}</span>
        <div className={dragClasses}
             onDragOver={handleDragOver}
             onDragLeave={handleDragOver}
             onDrop={handleFileSelect}>
          <div className={styles.inputWrapper}>
            <input type='file'
                   tabIndex='-1'
                   ref={inputRef}
                   className={styles.input}
                   name={name} 
                   multiple={multiple}
                   onChange={handleFileSelect}/>
            <div className={styles.inputCover}>
              <button className={styles.button}
                      type='button'
                      onClick={selectFile}>
                Choose Files</button>
              <span className={styles.fileName}>{fileNames}</span>
              {fileExt && <span className={styles.fileExt}>{fileExt}</span>}
            </div>
          </div>
          <span className={styles.helpText}>or drop files here</span>
        </div>
      </label>
      <button className={styles.button}
              type='button'
              onClick={() => fileList.forEach((file, index) => uploadFile(file, index))}>
        Upload All
      </button>
      <div className={styles.previews}>
        {fileList.map((file, index) => (
          <FilePreview key={index} 
                       data={file} 
                       onRemove={() => removeItem(index)}
                       onUpload={() => uploadFile(file, index)}/>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;

// const app = document.getElementById('app');
// render(<FileUpload multiple={true} 
//                    name='example-upload'
//                    maxSize={300000}
//                    onUpload={uploadFileToServer}
//                    label='Upload Files'/>, app)
