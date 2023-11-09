import React from 'react';
import Button from '@mui/joy/Button';
import { Box } from '@mui/material';
import Add from '@mui/icons-material/Add';
import AddCustomerModal from './AddCustomerModal';

export default function AddCustomerButton(props) {
  const [open, setOpen] = React.useState(false);
  const { setReloadFromCustomers } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        startDecorator={<Add />}
        style={{ margin: 15 }}
      >
        Add customer
      </Button>
      <AddCustomerModal
        open={open}
        setOpen={setOpen}
        setReloadFromAddCustomerButton={setReloadFromCustomers}
      />
    </Box>
  );
}
