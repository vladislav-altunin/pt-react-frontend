import React from 'react';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function EditCustomerModal(props) {
  const {
    custObj,
    openEditCustomerModalFromOptionsButton,
    setOpenEditCustomerModalFromOptionsButton,
    lnkFromOptionsButton,
    reloadStateOptionsButton,
    setReloadFromOptionsButton,
  } = props;

  //cust object is created to keep lnkFromOptionsButton unchanged
  //this will help for example if editing will be canceled
  //so that after reopening the window the initial state would preserve
  const custObject = lnkFromOptionsButton;

  const [existingCustomer, setExistingCustomer] = useState({
    firstname: custObject.firstname,
    lastname: custObject.lastname,
    email: custObject.email,
    phone: custObject.phone,
    streetaddress: custObject.streetaddress,
    postcode: custObject.postcode,
    city: custObject.city,
  });

  const handleInputChange = event => {
    setExistingCustomer(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCancel = () => {
    setOpenEditCustomerModalFromOptionsButton(false);
    //setting to initial state
    setExistingCustomer({
      firstname: lnkFromOptionsButton.firstname,
      lastname: lnkFromOptionsButton.lastname,
      email: lnkFromOptionsButton.email,
      phone: lnkFromOptionsButton.phone,
      streetaddress: lnkFromOptionsButton.streetaddress,
      postcode: lnkFromOptionsButton.postcode,
      city: lnkFromOptionsButton.city,
    });
    //this would ensure that the state is always updated, even after cancel
    //could not prove but it seems it works
    setReloadFromOptionsButton(currState => !currState);
  };

  //updateCustomer() was split into two functions, handleSave() is now a separate function
  const updateCustomer = async () => {
    //post request parameters
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(existingCustomer),
    };

    const existCustUrlHttp = lnkFromOptionsButton.links[0].href;
    const existCustUrlHttps =
      existCustUrlHttp.slice(0, 4) + 's' + existCustUrlHttp.slice(4); // this is for deploying on github

    const res = await fetch(existCustUrlHttps, options);
    const status = await res.json();
  };

  const reloadTable = () => {
    // reloadStateOptionsButton
    //   ? setReloadFromOptionsButton(false)
    //   : setReloadFromOptionsButton(true);

    //state update based on previous / current state ensures that the table updates
    // and the most recent sate is used
    //the commednted out section above showed that the state is not being updated each time
    setReloadFromOptionsButton(currState => !currState);
  };

  const handleSave = () => {
    updateCustomer();
    setOpenEditCustomerModalFromOptionsButton(false);
    reloadTable();
    reloadTable();
  };

  // const [open, setOpen] = useState(openEditCustomerModalFromOptionsButton);

  return (
    <React.Fragment>
      <Dialog
        open={openEditCustomerModalFromOptionsButton}
        onClose={handleCancel}
      >
        <DialogTitle>Edit customer details</DialogTitle>
        <DialogContent>
          <Box
            sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <div>
              <TextField
                autoFocus
                sx={{ m: 1, width: '20ch' }}
                margin="dense"
                label="First name"
                variant="outlined"
                name="firstname"
                value={existingCustomer.firstname}
                onChange={e => handleInputChange(e)}
              />
              <TextField
                sx={{ m: 1, width: '20ch' }}
                margin="dense"
                label="Last name"
                variant="outlined"
                name="lastname"
                value={existingCustomer.lastname}
                onChange={e => handleInputChange(e)}
              />
              <TextField
                sx={{ m: 1, width: '20ch' }}
                margin="dense"
                label="Phone"
                variant="outlined"
                name="phone"
                value={existingCustomer.phone}
                onChange={e => handleInputChange(e)}
              />
            </div>
            <div>
              <TextField
                sx={{ m: 1, width: '64ch' }}
                margin="dense"
                label="Email address"
                variant="outlined"
                name="email"
                value={existingCustomer.email}
                onChange={e => handleInputChange(e)}
              />
            </div>
            <TextField
              margin="dense"
              sx={{ m: 1, width: '64ch' }}
              label="Street address"
              variant="outlined"
              name="streetaddress"
              value={existingCustomer.streetaddress}
              onChange={e => handleInputChange(e)}
            />

            <div>
              <TextField
                sx={{ m: 1, width: '15ch' }}
                margin="dense"
                label="Postcode"
                variant="outlined"
                name="postcode"
                value={existingCustomer.postcode}
                onChange={e => handleInputChange(e)}
              />
              <TextField
                margin="dense"
                sx={{ m: 1, width: '47ch' }}
                label="City"
                variant="outlined"
                name="city"
                value={existingCustomer.city}
                onChange={e => handleInputChange(e)}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
