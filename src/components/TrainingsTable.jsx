import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import * as dayjs from 'dayjs';

const columns = [
  { field: 'date', headerName: 'Date', flex: 0.25 },
  { field: 'activity', headerName: 'Activity', flex: 0.25 },
  { field: 'duration', headerName: 'Duration', flex: 0.25 },
  { field: 'customer', headerName: 'Customer', flex: 0.25 },
];

export default function TrainingsTable() {
  const [trainingListwithRowIds, setTrainingListwithRowIds] = useState([
    {
      id: '',
      activity: 'test',
      duration: 'test',
      date: 'test',
      customer: 'test',
    },
  ]);

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
            const dateFormatted = dayjs(custObj.date).format('D-MMM-YY H:mm');
            return fetch(custUrlHttps).then(customerResponse => {
              return customerResponse.json().then(customerData => ({
                ...custObj,
                date: dateFormatted,
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

  return (
    <div style={{ height: 400, width: '50%', margin: 15 }}>
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