/**
 *
 * FileUploadForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Box } from '@mui/system';
import { CircularProgress, Input, Typography } from '@mui/material';

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
        <Typography
          className="form-title"
          color="#000000"
          fontSize="1.8rem"
          fontWeight="500"
        >
          Upload your Receipts file
        </Typography>
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
          <Typography
            variant="caption"
            sx={{ color: 'primary.main' }}
            marginTop={3}
          >
            Please wait.
          </Typography>
        </>
      )}

      {!loading && (
        <>
          <Typography
            variant="caption"
            sx={{ color: 'error.main' }}
            marginTop={3}
          >
            Please upload your receipts in a single pdf file.
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
            <Input
              type="file"
              accept="application/pdf"
              required
              id="file-input"
              sx={{
                width: '350px',
                maxWidth: '100%',
                color: '#444',
                padding: '2px',
                background: '#fff',
                borderRadius: '10px',
                border: '1px solid rgba(8, 8, 8, 0.288)',
                '&::file-selector-button': {
                  marginRight: '20px',
                  border: 'none',
                  background: '#084cdf',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'background .2s ease-in-out',
                  '&:hover': {
                    background: '#0d45a5',
                  },
                },
              }}
              onChange={(e) => updateFunction(e)}
            />
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
