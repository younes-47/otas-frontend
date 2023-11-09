/**
 *
 * Tables
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';

function Tables({ array }) {
  return (
    <>
      <div style={{ height: '85%', width: '100%' }}>
        <DataGrid
          sx
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...array}
          initialState={{
            ...array.initialState,
            pagination: {
              ...array.initialState?.pagination,
              paginationModel: {
                pageSize: 100,
                /* page: 0 // default value will be used if not passed */
              },
            },
          }}
        />
      </div>
    </>
  );
}

Tables.propTypes = {
  array: PropTypes.object.isRequired,
};

export default Tables;
