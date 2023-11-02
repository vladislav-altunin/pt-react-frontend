import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import OptionsButton from './OptionsButton';

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
      <DataGrid
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
