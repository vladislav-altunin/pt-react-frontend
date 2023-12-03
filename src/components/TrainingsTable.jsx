import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteTrainingModal from './DeleteTrainingModal';

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

export default function TrainingsTable() {
  const columns = [
    { field: 'date', headerName: 'Date', flex: 0.3 },
    { field: 'activity', headerName: 'Activity', flex: 0.2 },
    { field: 'duration', headerName: 'Duration', flex: 0.1 },
    { field: 'customer', headerName: 'Customer', flex: 0.3 },
    {
      field: 'delete',
      headerName: 'Delete',
      headerAlign: 'center',
      align: 'center',
      flex: 0.1,
      valueGetter: params => params.row,
      renderCell: params => {
        //here passing the link to CustomerTable => ended up passing the whole obj
        //Value getter is a MUST, it's not working straight away because of async
        const openModalAndPassCustomerLink = async () => {
          setDeleteTrainingModalOpen(true);
          const lnk = await params.value.links[0].href;
          setTrainingLink(lnk);
        };

        return (
          <IconButton
            aria-label="delete"
            onClick={openModalAndPassCustomerLink}
          >
            <DeleteIcon color="error" />
          </IconButton>
        );
      },
    },
  ];

  const [trainingListwithRowIds, setTrainingListwithRowIds] = useState([
    {
      id: '',
      activity: 'test',
      duration: 'test',
      date: 'test',
      customer: 'test',
      delete: 'tttttt',
    },
  ]);

  //DeleteTrainingModal toggle and deletion confitmation
  const [deleteTrainingModalOpen, setDeleteTrainingModalOpen] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [trainingLink, setTrainingLink] = useState('');

  const handleOpen = () => {
    setDeleteTrainingModalOpen(true);
  };

  // useEffect(() => {
  //   fetch('https://traineeapp.azurewebsites.net/api/trainings')
  //     .then(response => response.json())
  //     .then(response => {
  //       const content = response.content;

  //       const trainingListwithRowIds = Promise.all(
  //         content.map((custObj, index) => {
  //           const custUrlHttp = custObj.links[2].href;
  //           const custUrlHttps =
  //             custUrlHttp.slice(0, 4) + 's' + custUrlHttp.slice(4); // this is for deploying on github

  //           // insert date here
  //           const formattedDate = dayjs(custObj.date).format('DD-MMM-YY hh:mm');

  //           return fetch(custUrlHttps).then(customerResponse => {
  //             return customerResponse.json().then(customerData => ({
  //               ...custObj,
  //               id: index,
  //               customer: `${customerData.firstname} ${customerData.lastname}`, // Assign the response to the customer property
  //               date: `${formattedDate}`,
  //             }));
  //           });
  //         })
  //       );

  //       return trainingListwithRowIds;
  //     })
  //     .then(trainingListwithRowIds => {
  //       setTrainingListwithRowIds(trainingListwithRowIds);
  //     });
  // }, []);

  //Handle DELETE request
  const handleDeleteReq = async link => {
    const deleteTrainingLinkHttp = link;
    const deleteTrainingLinkHttps =
      deleteTrainingLinkHttp.slice(0, 4) +
      's' +
      deleteTrainingLinkHttp.slice(4); // this is for deploying on github
    console.log(deleteTrainingLinkHttps);
    const deleteTraining = await fetch(deleteTrainingLinkHttps, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (deleteTraining.ok) {
      setTrainingLink('');
      setDeleteTrainingModalOpen(false);
      toogleTrainingUpdate(udpateTrainings);
      console.log('deleted');
    }
  };

  //Update after delete trigger
  const [udpateTrainings, setUdpateTrainings] = useState(false);
  //toggle function
  const toogleTrainingUpdate = toggleStatus => {
    toggleStatus ? setUdpateTrainings(false) : setUdpateTrainings(true);
  };

  //Update table after deletion
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

            // insert date here
            const formattedDate = dayjs(custObj.date).format('DD-MMM-YY hh:mm');

            return fetch(custUrlHttps).then(customerResponse => {
              return customerResponse.json().then(customerData => ({
                ...custObj,
                id: index,
                customer: `${customerData.firstname} ${customerData.lastname}`, // Assign the response to the customer property
                date: `${formattedDate}`,
              }));
            });
          })
        );

        return trainingListwithRowIds;
      })
      .then(trainingListwithRowIds => {
        setTrainingListwithRowIds(trainingListwithRowIds);
      });
  }, [udpateTrainings]);

  return (
    <Box component="div" style={{ height: 400, width: '80%' }}>
      <StyledDataGrid
        style={{ margin: 15 }}
        rows={trainingListwithRowIds}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      <DeleteTrainingModal
        deleteTrainingModalOpenFromTrainingsTable={deleteTrainingModalOpen}
        setDeleteTrainingModalOpenFromTrainingsTable={
          setDeleteTrainingModalOpen
        }
        setConfirmDeletionTrainingsTable={setConfirmDeletion}
        handleDeleteReqFromTrainingsTable={handleDeleteReq}
        trainingLinkFromTrainingsTable={trainingLink}
        confirmDeletionFromTrainingsTable={confirmDeletion}
      />
    </Box>
  );
}
