
import React, { useState } from 'react';
import { Contract } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { create as ipfsClient } from 'ipfs-http-client';
import FileStorage from './FileStorage.json';
import { Buffer } from 'buffer';
import { Container, Grid, Paper, Typography, Button, TextField, Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';
import FileViewer from 'react-file-viewer';
import './App.css';

// Replace with the deployed smart contract address, API KEY & API KEY SECRET
const CONTRACT_ADDRESS = '0x...';
const API_KEY = 'YOUR_API_KEY';
const API_KEY_SECRET = 'YOUR_API_KEY_SECRET';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();
  const [ipfs, setIpfs] = useState(null);
  const [provider, setProvider] = useState(null);
  const [fileStorage, setFileStorage] = useState(null);
  const [buffer, setBuffer] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [fileHash, setFileHash] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Initialize IPFS and connect to the smart contract
  React.useEffect(() => {
    const init = async () => {
      setIpfs(
        ipfsClient({
          host: 'ipfs.infura.io',
          port: 5001,
          protocol: 'https',
          headers: {
            authorization: 'Basic ' + Buffer.from(API_KEY + ':' + API_KEY_SECRET).toString('base64'),
          },
        })
      );

      if (window.ethereum) {
        const newProvider = new Web3Provider(window.ethereum);
        setProvider(newProvider);

        const signer = newProvider.getSigner();
        const newFileStorage = new Contract(CONTRACT_ADDRESS, FileStorage.abi, signer);

        setFileStorage(newFileStorage);
      }
    };

    init();
  }, []);

  // Capture file input
  const captureFile = (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setBuffer(Buffer.from(reader.result));
    };

    setSelectedFile(file);
    reader.readAsArrayBuffer(file);
  };

  // Upload file to IPFS and add it to the smart contract
  const uploadFile = async () => {
    if (!buffer || !fileStorage) return;

    try {
      const file = new Blob([buffer], { type: "application/octet-stream" });
      const response = await ipfs.add(file, { pin: true });

      const { path } = response;

      await fileStorage.addFile(path, isPublic);
      console.log("File added:", path);
      setFileHash(path); // Update the state with the IPFS hash
    } catch (error) {
      console.error("Error:", error);
    }
  };

    // Verify file in the smart contract using getFile function
    const verifyFile = async () => {
      if (!fileStorage || !fileHash) return;
  
      try {
        const fileData = await fileStorage.getFile(fileHash);
        console.log("File data from smart contract:", fileData);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    return (
      <Container>
        <Typography variant="h4" component="h1">Celo-based Decentralized Storage</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <input type="file" onChange={captureFile} />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isPublic}
                    onChange={() => setIsPublic(!isPublic)}
                  />
                }
                label="Public"
              />
              <Button variant="contained" color="primary" onClick={uploadFile}>Upload</Button>
              {fileHash && <p>IPFS Hash: {fileHash}</p>} {/* Display the IPFS hash */}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <h2>Verify File</h2>
              <TextField
                type="text"
                placeholder="Enter IPFS hash"
                value={fileHash}
                onChange={(e) => setFileHash(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={verifyFile}>Verify</Button>
            </Paper>
          </Grid>
        </Grid>
        <div>
          <h2>File Preview</h2>
          {selectedFile && (
            <FileViewer
              fileType={selectedFile.type.split('/')[1]}
              filePath={URL.createObjectURL(selectedFile)}
            />
          )}
        </div>
      </Container>
    );
  }
  
  export default App;
  
