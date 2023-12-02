import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function AddTrainingModal(props) {
  const {
    openAddTrainingModalFromOptionsButton,
    setOpenAddTrainingModalFromOptionsButton,
    lnkFromOptionsButton,
    setReloadAfterTrainingAddingFromOptionsButton,
  } = props;

  //date picker is handeled separately from other input fields
  const [datePicker, setDatePicker] = useState(dayjs());

  //This object is the one to POST
  const [newTraining, setNewTraining] = useState({
    date: '',
    activity: '',
    duration: '',
    customer: '',
  });

  const handleCancel = () => {
    setOpenAddTrainingModalFromOptionsButton(false);
    setNewTraining({
      date: '',
      activity: '',
      duration: '',
      customer: '',
    });
  };

  //Handle picker
  const pickerChanged = pickerObject => {
    setDatePicker(prevDatePicker => {
      // Update the state based on the previous state
      setNewTraining({
        ...newTraining,
        date: prevDatePicker.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      });
      // Return the new state value
      return pickerObject;
    });
  };

  // handle inputs (date picker is handled separately)
  const handleInputChange = event => {
    //update inputs based on the previous state
    setNewTraining(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  //due to async nature of state updates, making converting it to asyc (not usure if it's best practice but it works)
  const updateTrainingAsync = async () => {
    return new Promise(resolve => {
      setNewTraining(prevTraining => {
        // Update the state based on the previous state
        const updatedTraining = {
          ...prevTraining,
          date: datePicker.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
          customer: lnkFromOptionsButton.links[0].href,
        };
        // Return the updated state
        resolve(updatedTraining);
      });
    });
  };

  const handlePostReq = training => {
    fetch('http://traineeapp.azurewebsites.net/api/trainings', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(training),
    }).catch(err => console.error(err));
  };

  const hanndleSave = async () => {
    try {
      const handledSave = await updateTrainingAsync();
      //implement else later and replace with ternary expression
      if (handledSave) {
        handlePostReq(handledSave);
        //to clear the form etc.
        handleCancel();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return newTraining ? (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <React.Fragment>
        <Dialog
          open={openAddTrainingModalFromOptionsButton}
          onClose={handleCancel}
        >
          <DialogTitle>Add training</DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextField
                sx={{ m: 1, width: '20ch' }}
                margin="dense"
                label="Activity"
                variant="outlined"
                name="activity"
                value={newTraining.activity}
                onChange={e => handleInputChange(e)}
              />
              <TextField
                sx={{ m: 1, width: '11ch' }}
                margin="dense"
                label="Duration"
                variant="outlined"
                name="duration"
                value={newTraining.duration}
                onChange={e => handleInputChange(e)}
              />
              <DateTimePicker
                label="Date & Time"
                name="date"
                value={datePicker}
                onChange={pickerObj => pickerChanged(pickerObj)}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={hanndleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </LocalizationProvider>
  ) : null;
}
