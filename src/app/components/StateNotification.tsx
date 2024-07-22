'use client'
import React from 'react';
import { Snackbar, Fade, Box, Typography, Slide } from '@mui/material';
import { useState } from 'react';


const StateNotification = ({message, checked, setChecked}) => {

    const handleClose = () => {
        setChecked(false);
    }

    /*<Snackbar open={checked}>
                <Fade in={checked}>
                    <Box height={75} width={250} display={'flex'} borderRadius={'10px'} justifyContent={'center'} alignItems={'center'} sx={{bgcolor: 'white'}}>
                        <Typography variant="h5" color={'black'}>
                            {message}
                        </Typography>
                    </Box>
                </Fade>
            </Snackbar>*/
    return (
        <div>
            <Slide in={checked} direction='up'>
            <Snackbar
            message={message}
            open={checked}
            key={'Load'}
            onClose={handleClose}
            autoHideDuration={1200}
            />
            </Slide>
        </div>
    );
};

export default StateNotification;
