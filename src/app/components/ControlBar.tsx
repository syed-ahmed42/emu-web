import React from 'react';
import { AppBar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import ControlsModal from '../ControlsModal';
import FitScreenIcon from '@mui/icons-material/FitScreen';

const ControlBar = ({handleSave, handleLoad, globalRom}) => {
    const router = useRouter();
    return (
        <div>
            {/*showBar && */<AppBar position='absolute' sx={{bgcolor: 'black'}}>
                <Toolbar variant='regular'>

                    
                <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => {router.back()}}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon/>
          </IconButton>
          <Button onClick={() => handleSave(globalRom.id, globalRom)}>Save</Button>
          
            <div style={{marginLeft: 'auto'}}>
          <Button onClick={() => handleLoad(globalRom.id, globalRom)}>Load</Button>
          </div>
          <ControlsModal></ControlsModal>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            
          >
            <FitScreenIcon/>
          </IconButton >

          

                </Toolbar>
            </AppBar>}
            
            </div>
    );
};

export default ControlBar;