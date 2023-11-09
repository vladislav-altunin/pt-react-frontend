import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import OptionsButton from './OptionsButton';
import { styled } from '@mui/material/styles';

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

export default function DataTable(props) {
  // const { reloadStateFromCustomer, setReloadFromCustomers } = props;
  //This will be passed to EditCustomerModal
  const [reloadAfterEdit, setReloadAfterEdit] = useState(false);

  const {
    reloadStateFromCustomerToCustomersTable,
    reloadAfterEditFromCustomers,
    setReloadAfterEditFromCustomers,
  } = props;

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
      valueGetter: params => params.row,
      renderCell: params => {
        //here passing the link to CustomerTable => ended up passing the whole obj
        //Value getter is a MUST, it's not working straight away because of async
        //Data is not loaded with the first render => so it's undefined
        //Interestingly, renderCell would work even if valueGetter was going after it
        const lnk = params.value;

        return (
          <OptionsButton
            lnkFromCustomerTable={lnk}
            setReloadAfterEditFromCustomersTable={
              setReloadAfterEditFromCustomers
            }
            // setReloadFromCustomersTable={setReloadFromCustomers}
            // reloadStateFromCustomersTable={reloadStateFromCustomer}
          />
        );
      },
    },
  ];

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
    },
  ]);

  // This block with try/catch for when data is still lodaing
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://traineeapp.azurewebsites.net/api/customers'
        );
        if (response.ok) {
          const data = await response.json();
          const content = data.content;

          const customerListWithIds = content.map((custObj, index) => ({
            ...custObj,
            id: index,
            // link: custObj.links[0].href, this is not required, as other solution was found
          }));

          setCustomerListWithIds(customerListWithIds);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error(error);
        // Handle errors - set a default value or an empty array
        setCustomerListWithIds([]); // For instance, setting it to an empty array
      }
    };

    fetchData();
  }, []);

  //This is a working block, just without try/catch
  // useEffect(() => {
  //   const fetchData = async () => {
  //   fetch('https://traineeapp.azurewebsites.net/api/customers')
  //     .then(response => response.json())
  //     .then(response => {
  //       const content = response.content;
  //       const customerListWithIds = content.map((custObj, index) => ({
  //         //mapping and adding a new property id: to the oject, required by MUI grid
  //         ...custObj,
  //         id: index,
  //         link: custObj.links[0].href,
  //       }));
  //       setCustomerListWithIds(customerListWithIds);
  //       console.log(customerListWithIds);
  //     });
  //   }
  // }, []);

  // A quick fix to reload the page after saving new customer
  // Will be passed to/from AddCustomerModal.jsx
  // const [reload, setReload] = useState(false);

  // Uncomment when possible

  // useEffect(() => {
  //   fetch('https://traineeapp.azurewebsites.net/api/customers')
  //     .then(response => response.json())
  //     .then(response => {
  //       const content = response.content;
  //       const customerListWithIds = content.map((custObj, index) => ({
  //         //mapping and adding a new property id: to the oject, required by MUI grid
  //         ...custObj,
  //         id: index,
  //       }));
  //       setCustomerListWithIds(customerListWithIds);
  //     });
  // }, [reloadStateFromCustomer]);

  // This block with try/catch for when data is still lodaing
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://traineeapp.azurewebsites.net/api/customers'
        );
        if (response.ok) {
          const data = await response.json();
          const content = data.content;

          const customerListWithIds = content.map((custObj, index) => ({
            ...custObj,
            id: index,
            // link: custObj.links[0].href, this is not required, as other solution was found
          }));

          setCustomerListWithIds(customerListWithIds);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error(error);
        // Handle errors - set a default value or an empty array
        setCustomerListWithIds([]); // For instance, setting it to an empty array
      }
    };

    fetchData();
  }, [reloadStateFromCustomerToCustomersTable, reloadAfterEditFromCustomers]);

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
