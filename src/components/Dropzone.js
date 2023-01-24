import React, { useState, useCallback } from "react";
import Arweave from "arweave";
import { useDropzone } from "react-dropzone";
import "../App.css";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const Dropzone = () => {
  const [file, setFile] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 1) {
        setFile(acceptedFiles[0]);
      } else {
        alert("Please drop only 1 file at a time.");
      }
    },
  });

  const handleUpload = useCallback(async () => {
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = async () => {
        const buffer = new Uint8Array(reader.result);
        const transaction = await arweave.createTransaction({
          data: buffer,
        });
        transaction.addTag("Content-Type", "image/png");
        await arweave.transactions.sign(transaction);
        let uploader = await arweave.transactions.getUploader(transaction);
        while (!uploader.isComplete) {
          await uploader.uploadChunk();
          console.log(
            `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
          );
        }

        setFile(null);
        alert(
          "Upload Successful. Please allow several minutes for transaction to finalize."
        );
      };
    }
  }, [file]);

  return (
    <div>
      {file ? (
        <div className="dropzone">
          <p>Filename: {file.name}</p>
          <p>File Type: {file.type}</p>
          <p>Size: {file.size} bytes</p>
          <button className="button" onClick={handleUpload}>
            Upload to Arweave
          </button>
        </div>
      ) : (
        <div className="dropzone" {...getRootProps()}>
          <input {...getInputProps()} />
          <p>
            Drag & Drop an Image Here <br></br> Or click to Select a File
          </p>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
