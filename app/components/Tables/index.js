/**
 *
 * Tables
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';

function Tables({
  // array,
  loading,
  rows,
  columns,
  initialState,
  getRowId,
  onRowSelectionChange,
  disableRowSelectionOnClick,
}) {
  return (
    <DataGrid
      sx={{
        '& .MuiCircularProgress-root': { color: 'black' },
        // '& .MuiDataGrid-booleanCell[data-value="true"]': {
        //   color: 'blue',
        // },
        // '& .MuiDataGrid-booleanCell[data-value="false"]': {
        //   color: 'red',
        // },
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 'bold',
        },
      }}
      loading={loading}
      rows={rows}
      columns={columns}
      onRowSelectionModelChange={onRowSelectionChange}
      getRowId={getRowId}
      initialState={initialState}
      disableRowSelectionOnClick={disableRowSelectionOnClick}
    />
  );
}

Tables.propTypes = {
  // array: PropTypes.object.isRequired,
  getRowId: PropTypes.func,
  rows: PropTypes.array,
  columns: PropTypes.array,
  initialState: PropTypes.object,
  onRowSelectionChange: PropTypes.func,
  disableRowSelectionOnClick: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Tables;
