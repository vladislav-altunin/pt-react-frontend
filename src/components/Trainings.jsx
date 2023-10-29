import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'date', headerName: 'Date', width: 300 },
  { field: 'activity', headerName: 'Activity', width: 130 },
  { field: 'duration', headerName: 'Duration', width: 130 },
  { field: 'customer', headerName: 'Customer', width: 130 },
];

export default function Trainings() {
  const [trainingListwithRowIds, setTrainingListwithRowIds] = useState([
    {
      id: '',
      activity: 'test',
      duration: 'test',
      date: 'test',
      customer: 'test',
    },
  ]);

  const [customerTestData, setCustomerTestData] = useState();

  useEffect(() => {
    fetch('https://traineeapp.azurewebsites.net/api/trainings')
      .then(response => response.json())
      .then(response => {
        const content = response.content;

        const trainingListwithRowIds = Promise.all(
          content.map((custObj, index) => {
            const custUrlHttp = custObj.links[2].href;
            const custUrlHttps =
              custUrlHttp.slice(0, 4) + 's' + custUrlHttp.slice(4); // this is for deploying on github
            return fetch(custUrlHttps).then(customerResponse => {
              return customerResponse.json().then(customerData => ({
                ...custObj,
                id: index,
                customer: `${customerData.firstname} ${customerData.lastname}`, // Assign the response to the customer property
              }));
            });
          })
        );

        return trainingListwithRowIds;
      })
      .then(trainingListwithRowIds => {
        setTrainingListwithRowIds(trainingListwithRowIds);
      });
  }, []);

  // useEffect(() => {
  //   console.log(trainingListwithRowIds);
  //   console.log(`This is customer data ${customerTestData}`);
  // }, [trainingListwithRowIds, customerTestData]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={trainingListwithRowIds}
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
