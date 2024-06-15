import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';
import KeyBoardIcons from './components/KeyBoardIcons';

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

export default function ControlsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fontSize = `36px`
  return (
    <div>
      <Button onClick={handleOpen}>Controls</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Controls
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2, display: 'flex' }}>
                <KeyBoardIcons iconName={`keyboard_arrow_up`} fontSize={fontSize}/>
                <KeyBoardIcons iconName={`keyboard_arrow_down`} fontSize={fontSize}/>
                <KeyBoardIcons iconName={`keyboard_arrow_left`} fontSize={fontSize}/>
                <KeyBoardIcons iconName={`keyboard_arrow_right`} fontSize={fontSize}/>
            </Typography>
            <Typography id="transition-modal-description" sx={{ display: 'flex'  }}>
                <KeyBoardIcons iconName={`keyboard_a`} fontSize={fontSize}/>
                <KeyBoardIcons iconName={`keyboard_s`} fontSize={fontSize}/>
                <KeyBoardIcons iconName={`keyboard_z`} fontSize={fontSize}/>
                <KeyBoardIcons iconName={`keyboard_x`} fontSize={fontSize}/>
            </Typography>
            <Typography id="transition-modal-description" sx={{ display: 'flex'  }}>
                <KeyBoardIcons iconName={`keyboard_return`} fontSize={fontSize}/>
                <KeyBoardIcons iconName={`keyboard_shift`} fontSize={fontSize}/>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Start - Space
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Select - Enter
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
