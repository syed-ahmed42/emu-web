'use client'
import React from 'react';
import { useEffect, useContext, useState, useRef } from 'react';
import { Nostalgist } from 'nostalgist';
import { RomContext } from '../RomContext';
import { AppBar } from '@mui/material';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link'
import ControlsModal from '../ControlsModal';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import { Icon } from '@mui/material';
import KeyBoardIcons from './KeyBoardIcons';

import {db} from '../db'

let game;
let state;

const classes = {
    full: {width: '100%', height: '100vh'},
    default: {height: '100vh', width: 'auto'}
}

const handleSave = async (gameId) => {
    if (game)
    {
        state = await game.saveState()
        db.games.update(gameId, {save: state}).then(function (updated) {
            if (updated)
              console.log ("Save state has been stored in the db");
            else
              console.log ("Nothing was updated");
          });
    }
    
}

const handleLoad = async (gameId) => {
    if (!state)
    {
        let gameObj = await db.games.get(gameId);
        state = gameObj.save;
    }
    if (game && state)
    {
        await game.loadState(state.state)
    }
}

function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}



export default function Super () {
    const API_ENDPOINT = process.env.LOCAL_API_ENDPOINT || '/'

    const {globalRom, setGlobalRom} = useContext(RomContext);
    const [showBar, setShowBar] = useState(false);
    const gamerman = useRef(null);
    //const [wait, setWait] = useState(false);

    let wait = false;
    let timer;
    const handleBar = async () => {
            if (!wait)
            {
            console.log('Mouse movemnt');
            wait = true;
            if (!showBar)
            {
                setShowBar(true);
            }
            
                console.log("Clear Timeout");
                clearTimeout(gamerman.current);
            
            
            setTimeout(function() {
                wait = false;
            }, 1000)
            gamerman.current = setTimeout(function() {
                console.log('Should not run on move')
                setShowBar(false);
            }, 7500)
            

        }
        
    }


    Nostalgist.configure({
        element: 'canvas',
        resolveRom(rom) {
            //return `https://raw.githubusercontent.com/retrobrews/nes-games/master/31in1realgame-multicart.nes`
            //return `https://raw.githubusercontent.com/syed-ahmed42/emu-web/main/public/nek.sfc`
            return `${rom}`
          },
          resolveCoreWasm(core) {
            return `/snes9x_libretro.wasm`
          },
          resolveCoreJs(core) {
            return `/snes9x_libretro.js`
          },
      })

    useEffect(() => {
        
        
        if (globalRom)
        {
        async function gamer() {game = await Nostalgist.launch({
            core: 'snes9x',
            rom: globalRom.file,
          })
        }
        gamer();
        }


        return () => {
            if (game)
            {
                game.exit();
            }
            
        }
    }, [])


    



    return (
        <div /*onMouseMove={handleBar}*/>
            <canvas id="snesCanvas" width='256' height='240' style={classes['default']}></canvas>
            <div>
            {/*showBar && */<AppBar position='absolute' sx={{bgcolor: 'black'}}>
                <Toolbar variant='regular'>

                    <Link href="/select">
                <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon/>
          </IconButton>
          </Link>
            <div style={{marginLeft: 'auto'}}>
          <Button onClick={() => handleLoad(globalRom.id)}>Load</Button>
          <Button onClick={() => handleSave(globalRom.id)}>Save</Button>
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
        </div>
    );
};
