import React from 'react';
import Button from '@mui/joy/Button';
import { Box } from '@mui/material';
import Add from '@mui/icons-material/Add';

export default function AddCustomerButton() {
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <Button
        variant="outlined"
        startDecorator={<Add />}
        style={{ margin: 15 }}
      >
        Add customer
      </Button>
    </Box>
  );
}
