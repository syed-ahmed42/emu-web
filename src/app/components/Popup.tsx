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
  const handleClose = (event, reason) => {
    setOpen(false);
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
        slots={{ backdrop: Backdrop}}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open} style={{ transitionDelay: open ? '250ms' : '0ms' }}>
          <Box onClick={handleClick} sx={[style, {display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px'}]}>
          <Typography id="modal-modal-description">
      Tap anywhere on the screen to continue
          </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
