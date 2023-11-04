import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import OptionsButton from './OptionsButton';
import { styled } from '@mui/material/styles';

const columns = [
  { field: 'firstname', headerName: 'First name', flex: 0.16 },
  { field: 'lastname', headerName: 'Last name', flex: 0.16 },
  { field: 'email', headerName: 'Email', flex: 0.16 },
  { field: 'phone', headerName: 'Phone', flex: 0.1 },
  { field: 'streetaddress', headerName: 'Addreess', flex: 0.15 },
  { field: 'postcode', headerName: 'Postcode', flex: 0.1 },
  { field: 'city', headerName: 'City', flex: 0.1 },
  {
    field: 'actions',
    headerName: 'Actions',
    headerAlign: 'center',
    align: 'center',
    flex: 0.07,
    renderCell: params => {
      const handleDelete = () => {
        const id = params.row.id;
        // Perform delete action based on id
        console.log(`Delete item with ID: ${id}`);
      };

      return <OptionsButton />;
    },
  },
];

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color:
    theme.palette.mode === 'light'
      ? 'rgba(0,0,0,.85)'
      : 'rgba(255,255,255,0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
  },
  '& .MuiDataGrid-cell': {
    color:
      theme.palette.mode === 'light'
        ? 'rgba(0,0,0,.85)'
        : 'rgba(255,255,255,0.65)',
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
}));

export default function DataTable() {
  const [customerListWithIds, setCustomerListWithIds] = useState([
    {
      id: '',
      firstname: 'test',
      lastlame: 'test',
      email: 'test',
      phone: 'test',
      streetaddress: 'test',
      postcode: 'test',
      city: 'test',
      sthelse: 'anoter else',
    },
  ]);

  useEffect(() => {
    fetch('https://traineeapp.azurewebsites.net/api/customers')
      .then(response => response.json())
      .then(response => {
        const content = response.content;
        const customerListWithIds = content.map((custObj, index) => ({
          //mapping and adding a new property id: to the oject, required by MUI grid
          ...custObj,
          id: index,
        }));
        setCustomerListWithIds(customerListWithIds);
      });
  }, []);

  useEffect(() => {
    console.log(customerListWithIds);
  }, [customerListWithIds]);

  return (
    <Box component="div" style={{ height: 400, width: '100%' }}>
      <StyledDataGrid
        style={{ margin: 15 }}
        rows={customerListWithIds}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </Box>
  );
}
