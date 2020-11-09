/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import auth from '../auth/auth-helper';
import { remove } from './api-mapEntry';

export default function DeleteUser(props) {
  const [open, setOpen] = useState(false);

  const jwt = auth.isAuthenticated();
  const clickButton = () => {
    setOpen(true);
  };

  const handleRequestClose = () => {
    setOpen(false);
  };
  const deleteEntry = () => {
    remove({
      userId: props.userId, entryId: props.entryId,
    }, { t: jwt.token }).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        handleRequestClose();
        props.onClose();
      }
    });
  };

  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>Delete Entry</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete this entry.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteEntry} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired,
  entryId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
