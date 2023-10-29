import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'firstname', headerName: 'First name', width: 130 },
  { field: 'lastname', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'phone', headerName: 'Phone', width: 130 },
  { field: 'streetaddress', headerName: 'Addreess', width: 130 },
  { field: 'postcode', headerName: 'Postcode', width: 90 },
  { field: 'city', headerName: 'City', width: 130 },
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
    <div style={{ height: 400, width: '100%' }}>
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

//Fetch and filter json with map()
