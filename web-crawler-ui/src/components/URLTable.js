import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Chip, Box } from '@mui/material';

const statusChip = (status) => {
  switch (status) {
    case 'Active':
      return <Chip label="Active" size="small" sx={{ bgcolor: 'rgba(76,217,100,0.1)', color: '#4cd964', fontWeight: 600, pl: 0.5 }} />;
    case 'Disabled':
      return <Chip label="Disabled" size="small" sx={{ bgcolor: 'rgba(176,176,176,0.1)', color: '#b0b0b0', fontWeight: 600, pl: 0.5 }} />;
    case 'Starting':
      return <Chip label="Starting" size="small" sx={{ bgcolor: 'rgba(255,179,0,0.1)', color: '#ffb300', fontWeight: 600, pl: 0.5 }} />;
    default:
      return <Chip label={status} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 600, pl: 0.5 }} />;
  }
};

const columns = [
  { field: 'pageTitle', headerName: 'Name', flex: 2, headerClassName: 'super-app-theme--header', resizable: false },
  { field: 'internalLinks', headerName: 'Internal Links', flex: 1, headerClassName: 'super-app-theme--header', resizable: false },
  { field: 'htmlVersion', headerName: 'Version', flex: 1, headerClassName: 'super-app-theme--header', resizable: false },
  { field: 'inaccessibleLinks', headerName: 'Inaccessible Links', flex: 2, headerClassName: 'super-app-theme--header', resizable: false },
  { field: 'externalLinks', headerName: 'External Links', flex: 1, headerClassName: 'super-app-theme--header', resizable: false },
  { field: 'hasLoginForm', headerName: 'Login Form', flex: 1, headerClassName: 'super-app-theme--header', resizable: false },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => statusChip(params.value),
    sortable: false,
    filterable: false,
    resizable: false,
  },
];

const URLTable = ({ urls }) => {
  const rows = urls.map((url, index) => ({ id: index, ...url }));

  return (
    <Box sx={{ height: 'calc(100% - 64px)', bgcolor: 'transparent', borderRadius: 2, p: 3, boxShadow: 0, my: 4, border: '2px solid #23272f', overflowX: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableColumnResize
        isColumnResizable={false}
        sx={{
          bgcolor: '#181b20',
          color: '#fff',
          border: 'none',
          fontSize: 16,
          '.MuiDataGrid-columnHeaders': {
            bgcolor: '#000 !important',
            color: '#fff !important',
            fontWeight: 700,
            fontSize: 18,
            borderBottom: '1px solid #222',
          },
          '.MuiDataGrid-columnHeader': {
            bgcolor: '#000 !important',
            color: '#fff !important',
          },
          '.MuiDataGrid-cell': {
            borderBottom: '1px solid #222',
          },
          '.MuiCheckbox-root': {
            color: '#fff',
          },
          '.MuiDataGrid-row:hover': {
            bgcolor: '#23272f',
          },
          '.MuiDataGrid-footerContainer': {
            bgcolor: '#111',
            color: '#fff',
            borderTop: '1px solid #222',
          },
          '.MuiDataGrid-selectedRowCount': {
            color: '#fff',
          },
        }}
      />
    </Box>
  );
};

export default URLTable;