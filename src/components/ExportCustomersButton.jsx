import React from 'react';
import Button from '@mui/joy/Button';
import { Box } from '@mui/material';
import Add from '@mui/icons-material/Add';
import Download from '@mui/icons-material/Download';

export default function ExportCustomersButton() {
  const fetchCustomersAndTriggerCsvCreation = async () => {
    try {
      const response = await fetch(
        'https://traineeapp.azurewebsites.net/api/customers'
      );
      if (response.ok) {
        const data = await response.json();
        const content = data.content;
        console.log(content);

        const customerListWithIds = content.map((custObj, index) => ({
          ...custObj,
          id: index,
        }));

        // Trigger CSV creation and pass modified response there
        createCsv(customerListWithIds);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
      // Handle errors - set a default value or an empty array
      setCustomerListWithIds([]); // For instance, setting it to an empty array
    }
  };

  //This function creates and exports CSV, it is triggered inside fetchCustomersAndTriggerCsvCreation
  //This ensures that the data is fetched
  const createCsv = data => {
    //Define header / header mapping
    const custHeadersMapping = {
      'First Name': 'firstname',
      'Last Name': 'lastname',
      Email: 'email',
      Phone: 'phone',
      'Street Address': 'streetaddress',
      Postcode: 'postcode',
      City: 'city',
    };

    const custHeaders = Object.keys(custHeadersMapping);

    const csvContent =
      `${custHeaders.join(';')}\n` +
      data
        .map(row =>
          custHeaders.map(header => row[custHeadersMapping[header]]).join(';')
        )
        .join('\n');

    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'customers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //Triggers the fetch which triggeres CSV creation and export
  const exportCustomers = async () => {
    fetchCustomersAndTriggerCsvCreation();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <Button
        variant="soft"
        onClick={exportCustomers}
        startDecorator={<Download />}
        // style={{ margin: 15 }}
      >
        Export
      </Button>
    </Box>
  );
}
