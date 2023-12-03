import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import { useState, useEffect, useRef } from 'react';

export default function DeleteTrainingModal(props) {
  const {
    deleteTrainingModalOpenFromTrainingsTable,
    setDeleteTrainingModalOpenFromTrainingsTable,
    setConfirmDeletionTrainingsTable,
    handleDeleteReqFromTrainingsTable,
    trainingLinkFromTrainingsTable,
    confirmDeletionFromTrainingsTable,
  } = props;

  const confirmDeleteTraining = async () => {
    if (trainingLinkFromTrainingsTable) {
      await handleDeleteReqFromTrainingsTable(trainingLinkFromTrainingsTable);
      console.log('deletion started');
    }
  };
  const handleCancel = () => {
    setDeleteTrainingModalOpenFromTrainingsTable(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={deleteTrainingModalOpenFromTrainingsTable}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Proceed to delete?'}
        </DialogTitle>
        <DialogContent>
          <Alert severity="error">
            Pressing DELETE will remove the training permanently!
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} autoFocus>
            Cancel
          </Button>
          <Button onClick={confirmDeleteTraining}>Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
