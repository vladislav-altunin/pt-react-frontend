import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';

export default function DeleteCustomerModal(props) {
  const {
    openDeleteCustomerModalFromOptionsButton,
    setOpenDeleteCustomerModalFromOptionsButton,
    lnkFromOptionsButton,
    setReloadAfterEditFromOptionsButton,
  } = props;

  const handleClose = () => {
    setOpenDeleteCustomerModalFromOptionsButton(false);
  };

  //async is CRUCIAL in this case eventhough deleteCustomer() is async itself
  const handleDeleteCustomer = async () => {
    const deleteCust = await deleteCustomer();
    setOpenDeleteCustomerModalFromOptionsButton(false);
    reloadTable();
  };

  //updateCustomer() was split into two functions, handleSave() is now a separate function
  const deleteCustomer = async () => {
    //DELETE request parameters
    const options = {
      method: 'DELETE',
    };

    const existCustUrlHttp = lnkFromOptionsButton.links[0].href;
    const existCustUrlHttps =
      existCustUrlHttp.slice(0, 4) + 's' + existCustUrlHttp.slice(4); // this is for deploying on github

    const res = await fetch(existCustUrlHttps, options);
  };

  const reloadTable = () => {
    //state update based on previous / current state ensures that the table updates
    // and the most recent sate is used
    setReloadAfterEditFromOptionsButton(currState => !currState);
  };

  return (
    <React.Fragment>
      <Dialog
        open={openDeleteCustomerModalFromOptionsButton}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Proceed to delete?'}
        </DialogTitle>
        <DialogContent>
          <Alert severity="error">
            This is action will remove all customer's data including trainings!
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteCustomer} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
