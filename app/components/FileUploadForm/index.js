/**
 *
 * FileUploadForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import './fileUploadRaw.css';
import Box from '@mui/system/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/joy/Typography';

function FileUploadForm({ loading, updateFunction }) {
  return (
    <Box
      className="form"
      bgcolor="#fff"
      boxShadow="0 10px 60px rgb(218, 229, 255)"
      border="1px solid rgb(159, 159, 160)"
      borderRadius="20px"
      padding="2rem .7rem .7rem .7rem"
      textAlign="center"
      fontSize="1.125rem"
      maxWidth="320px"
    >
      {!loading ? (
        <Typography level="h3">Upload your Receipts file</Typography>
      ) : (
        <>
          <Typography
            className="form-title"
            color="#000000"
            fontSize="1.8rem"
            fontWeight="500"
          >
            <CircularProgress size={20} color="inherit" />
            Uploading...
          </Typography>
          <Typography level="body-mg">Please wait.</Typography>
        </>
      )}

      {!loading && (
        <>
          <Typography
            color="danger"
            level="body-sm"
            variant="plain"
            marginTop={2}
          >
            *Please upload your receipts in a single pdf file.
          </Typography>
          <label htmlFor="file-input" className="drop-container">
            <Typography
              className="drop-title"
              color="#444"
              fontSize="20px"
              fontWeight="bold"
              textAlign="center"
            >
              Drop files here
            </Typography>
            or
            <input
              type="file"
              accept="application/pdf"
              required
              id="file-input"
              onChange={(e) => updateFunction(e)}
            ></input>
          </label>
        </>
      )}
    </Box>
  );
}

FileUploadForm.propTypes = {
  updateFunction: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FileUploadForm;
