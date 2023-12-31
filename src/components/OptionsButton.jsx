import * as React from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled, alpha } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditCustomerModal from './EditCustomerModal';
import DeleteCustomerModal from './DeleteCustomerModal';
import AddTrainingModal from './AddTrainingModal';

const options = ['Add training', 'Edit customer', 'Delete customer'];

const StyledMenu = styled(props => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const ITEM_HEIGHT = 48;

export default function OptionsButton(props) {
  const {
    lnkFromCustomerTable,
    setReloadAfterEditFromCustomersTable,
    setReloadAfterTrainingAddingFromCustomersTable,
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const [openEditCustomerModal, setOpenEditCustomerModal] = useState(false);
  const [openDeleteCustomerModal, setOpenDeleteCustomerModal] = useState(false);
  const [openAddTrainingModal, setOpenAddTrainingModal] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setOpenEditCustomerModal(true);
    //hide options
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setOpenDeleteCustomerModal(true);
    //hide options
    setAnchorEl(null);
  };

  const handleAddTraining = () => {
    setOpenAddTrainingModal(true);
    //hide options
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={handleAddTraining} disableRipple>
          <AddIcon />
          Add Training
        </MenuItem>
        <MenuItem onClick={handleEdit} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleDelete} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
      </StyledMenu>

      {/* Modals that appear onclick */}

      <EditCustomerModal
        openEditCustomerModalFromOptionsButton={openEditCustomerModal}
        setOpenEditCustomerModalFromOptionsButton={setOpenEditCustomerModal}
        lnkFromOptionsButton={lnkFromCustomerTable}
        setReloadAfterEditFromOptionsButton={
          setReloadAfterEditFromCustomersTable
        }
      />
      <DeleteCustomerModal
        openDeleteCustomerModalFromOptionsButton={openDeleteCustomerModal}
        setOpenDeleteCustomerModalFromOptionsButton={setOpenDeleteCustomerModal}
        lnkFromOptionsButton={lnkFromCustomerTable}
        setReloadAfterEditFromOptionsButton={
          setReloadAfterEditFromCustomersTable
        }
      />
      <AddTrainingModal
        openAddTrainingModalFromOptionsButton={openAddTrainingModal}
        setOpenAddTrainingModalFromOptionsButton={setOpenAddTrainingModal}
        lnkFromOptionsButton={lnkFromCustomerTable}
        setReloadAfterTrainingAddingFromOptionsButton={
          setReloadAfterTrainingAddingFromCustomersTable
        }
      />
    </div>
  );
}
