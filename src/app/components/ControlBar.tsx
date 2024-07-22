'use client'
import React, { useEffect } from 'react';
import { AppBar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import ControlsModal from '../ControlsModal';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import { Slide } from '@mui/material';
import { useState } from 'react';
import {Box} from '@mui/material';
import StateNotification from './StateNotification';

const ControlBar = ({checked, setChecked, handleSave, handleLoad, globalRom, handleFullscreen}) => {
    //const [checked, setChecked] = useState(true);
    const [timerId, setTimerId] = useState(null);
    const [message, setMessage] = useState(null);

    const [saveTimer, setSaveTimer] = useState(null);
    const [loadTimer, setLoadTimer] = useState(null);

    const [stateNotification, setStateNotification] = useState(false);

    const handleMouseLeave = (time) => {
        if (!timerId)
        {
            let tempTimerId = setTimeout(() => {
                setChecked(false);
            }, time)
            setTimerId(tempTimerId);
        }
    }

    const handleMouseEnterAndHover = () => {
        if (timerId)
        {
            clearTimeout(timerId);
            setTimerId(null);
        }
        if (!checked) setChecked(true);
    }

    const handleStateNotification = () => {
        setStateNotification(true);
    }

    const handleSaveEvents = async () => {
        await handleSave(globalRom.id, globalRom); 
        setMessage('Game saved'); 
        handleStateNotification();
    }

    const timer = (timer, setTimer, delay, func) => {
        if (!timer)
        {
            func();
            let tempTimer = setTimeout(() => {
                setTimer(null);
            }, delay);
            setTimer(tempTimer);
        }
    }

    const handleLoadEvents = async () => {
        await handleLoad(globalRom.id, globalRom); 
        setMessage('Game loaded'); 
        handleStateNotification();
    }


    const router = useRouter();

    useEffect(() => {
        handleMouseLeave(10000);
    }, [])

    return (
        <div onMouseOver={handleMouseEnterAndHover} onMouseLeave={() => handleMouseLeave(1500)} onMouseEnter={handleMouseEnterAndHover} style={{position: 'absolute', left: 0, right: 0, height: '150px'}}>
            
            <Slide  in={checked} timeout={{appear: 500, enter: 500, exit: 500}}>
            <AppBar position='absolute' sx={{bgcolor: 'black'}}>
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
          
          <Button onClick={() => timer(saveTimer, setSaveTimer, 2000, handleSaveEvents)}> 
            Save
            </Button>
            <div style={{marginLeft: 'auto'}}>
          <Button onClick={() => timer(loadTimer, setLoadTimer, 2000, handleLoadEvents)}>Load</Button>
          </div>
          <ControlsModal></ControlsModal>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleFullscreen}
          >
            <FitScreenIcon/>
          </IconButton >

          

                </Toolbar>
            </AppBar>
            </Slide>
            <StateNotification message={message} checked={stateNotification} setChecked={setStateNotification}/>
            
            </div>
    );
};

export default ControlBar;