import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'firstname', headerName: 'First name', flex: 0.15 },
  { field: 'lastname', headerName: 'Last name', flex: 0.15 },
  { field: 'email', headerName: 'Email', flex: 0.15 },
  { field: 'phone', headerName: 'Phone', flex: 0.15 },
  { field: 'streetaddress', headerName: 'Addreess', flex: 0.15 },
  { field: 'postcode', headerName: 'Postcode', flex: 0.1 },
  { field: 'city', headerName: 'City', flex: 0.15 },
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
    <div style={{ height: 400, width: '80%', margin: 15 }}>
      <DataGrid
        rows={customerListWithIds}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
