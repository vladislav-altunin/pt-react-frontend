import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomerModal(props) {
  //Parent:Customers
  const { open, setOpen, setReloadFromAddCustomerButton } = props;

  const [newCustomer, setNewCustomer] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    streetaddress: '',
    postcode: '',
    city: '',
  });

  const handleCancel = () => {
    setOpen(false);
    setNewCustomer({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      streetaddress: '',
      postcode: '',
      city: '',
    });
    //ensures current state even after cancel action
    setReloadFromAddCustomerButton(currState => !currState);
  };

  const handleSave = () => {
    saveCustomer(newCustomer);
    setOpen(false);
    setNewCustomer({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      streetaddress: '',
      postcode: '',
      city: '',
    });
    setReloadFromAddCustomerButton(currState => !currState);
  };

  const handleInputChange = event => {
    setNewCustomer({ ...newCustomer, [event.target.name]: event.target.value });
  };

  const saveCustomer = customer => {
    fetch('https://traineeapp.azurewebsites.net/api/customers', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(customer),
    }).catch(err => console.error(err));
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>New customer</DialogTitle>
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
                value={newCustomer.firstname}
                onChange={e => handleInputChange(e)}
              />
              <TextField
                sx={{ m: 1, width: '20ch' }}
                margin="dense"
                label="Last name"
                variant="outlined"
                name="lastname"
                value={newCustomer.lastname}
                onChange={e => handleInputChange(e)}
              />
              <TextField
                sx={{ m: 1, width: '20ch' }}
                margin="dense"
                label="Phone"
                variant="outlined"
                name="phone"
                value={newCustomer.phone}
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
                value={newCustomer.email}
                onChange={e => handleInputChange(e)}
              />
            </div>
            <TextField
              margin="dense"
              sx={{ m: 1, width: '64ch' }}
              label="Street address"
              variant="outlined"
              name="streetaddress"
              value={newCustomer.streetaddress}
              onChange={e => handleInputChange(e)}
            />

            <div>
              <TextField
                sx={{ m: 1, width: '15ch' }}
                margin="dense"
                label="Postcode"
                variant="outlined"
                name="postcode"
                value={newCustomer.postcode}
                onChange={e => handleInputChange(e)}
              />
              <TextField
                margin="dense"
                sx={{ m: 1, width: '47ch' }}
                label="City"
                variant="outlined"
                name="city"
                value={newCustomer.city}
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
