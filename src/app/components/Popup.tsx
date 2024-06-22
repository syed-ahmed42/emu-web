import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({open, setOpen}) {
  const handleOpen = () => setOpen(true);
  const handleClose = (event, reason) => {
    if(reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
        // Set 'open' to false, however you would do that with your particular code.
        setOpen(false);
    }
  }
  const handleClick = () => {
    setOpen(false);
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        disableAutoFocus={true}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={[style, {display: 'flex', alignItems: 'center', justifyContent: 'center'}]}>
            <Button variant='outlined' onClick={handleClick}>
              Launch
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
