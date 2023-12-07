import React from 'react';
import { Box, Typography } from '@mui/material';

export default function CalendarHeader() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h5" style={{ margin: 15 }} gutterBottom>
        Calendar
      </Typography>
    </Box>
  );
}
