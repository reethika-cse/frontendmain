import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import DialogTitle from '@mui/material/DialogTitle';


export default function RefreshTokenDialog(props) {




  const { getAccessToken, open, setOpen } = props;


  const getRefreshToken = async () => {
    try {
      getAccessToken();
      setOpen(false);
    } catch (err) {
      alert("Something Went Wrong!!!");
    }
  };
  return (


      <Dialog
        open={open}
        onClose={() => getRefreshToken()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please Click on agree to get refresh token."}
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => getRefreshToken()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

  );
}