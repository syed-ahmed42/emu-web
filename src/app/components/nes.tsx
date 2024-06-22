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
import { useRouter } from 'next/navigation'  // Usage: App router
import ControlBar from './ControlBar';
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

import {db} from '../db'

let game;
let state;
let isDefault = false;

const classes = {
    full: {width: '100%', height: '100vh'},
    default: {height: '100vh', width: 'auto'}
}



function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}




export default function Regular ({globalRom}) {
    const API_ENDPOINT = process.env.LOCAL_API_ENDPOINT || '/'

    //const router = useRouter();

    //let {globalRom, setGlobalRom} = useContext(RomContext);
    const [globalRomState, setGlobalRomState] = useState(null);
    const [showBar, setShowBar] = useState(false);
    const gamerman = useRef(null);
    //const [wait, setWait] = useState(false);
    const searchParams = useSearchParams()

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


    const handleSave = async (gameId, globalRom) => {
        let dbName = 'games';
        if (globalRom.defaultGame)
        {
            dbName = 'defaultGames'
        }
        if (game)
        {
            state = await game.saveState()
            db[`${dbName}`].update(globalRom.id, {save: state}).then(function (updated) {
                if (updated)
                  console.log ("Save state has been stored in the db");
                else
                  console.log ("Nothing was updated");
              });
        }
        
    }
    
    const handleLoad = async (gameId, globalRom) => {
        let dbName = 'games';
        console.log(`This is the gameId outside: ${globalRom.id}`)
        if (globalRom.defaultGame)
        {
            dbName = 'defaultGames'
        }
        if (!state)
        {
            console.log(`This is the gameId: ${globalRom.id}`)
            let gameObj = await db[dbName].get(globalRom.id);
            state = gameObj.save;
        }
        if (game && state)
        {
            await game.loadState(state.state)
        }
    }

    const getParameters = () => {
        let dg = searchParams.get('dg');
        let g = searchParams.get('g');
        if (dg)
        {
            return {key: 'dg', value: dg}
        }
        else if (g)
        {
            return {key: 'g', value: g}
        }
        return null;
    }

    const getGameObject = async (dbObj) => {
        let myGame = null;
        let dbParamObj = getParameters();
        
        let dbStoreName = dbParamObj?.key;
        let dbGameId = Number(dbParamObj?.value);

        console.log("These are the numbers: " + dbStoreName + "" + dbGameId)

        if (dbStoreName = 'dg')
        {
            myGame = await db.defaultGames.get(dbGameId);
        }
        else if (dbStoreName = 'g')
        {
            myGame = await db.games.get(dbGameId);
        }
        console.log('This is the game ' + myGame)
        return myGame;
    }
    


    Nostalgist.configure({
        element: 'canvas',
        resolveRom(rom) {
            //return `https://raw.githubusercontent.com/retrobrews/nes-games/master/31in1realgame-multicart.nes`
            //return `https://raw.githubusercontent.com/syed-ahmed42/emu-web/main/public/nek.sfc`
            return `${rom}`
          },
          resolveCoreWasm(core) {
            return `/fceumm_libretro.wasm`
          },
          resolveCoreJs(core) {
            return `/fceumm_libretro.js`
          },
      })

    useEffect(() => {

        const loadAndStart = async () => {
            /*if (!globalRom)
            {
                console.log("Before value of game rom: " + globalRom);
                globalRom = await getGameObject(db)
                console.log("After value of game rom: " + globalRom)
            }*/
            console.log("This is child global: " + globalRom)
            if (globalRom)
            {
                setGlobalRomState(globalRom)
                console.log("This is global rom: " +  globalRom.id);
                setShowBar(true)
                
            async function gamer() {game = await Nostalgist.nes(globalRom.file.name)
            }
            gamer();
            }
        
        }
        
        
        /*if (globalRom)
        {
            console.log("This is global rom: " +  globalRom)
            
        async function gamer() {game = await Nostalgist.nes(globalRom.file.name)
        }
        gamer();
        }*/
        
        loadAndStart();


        return () => {
            if (game)
            {
                setShowBar(false);
                state = null;
                game.exit();
                game = null;
            }
            
        }
    }, [])


    



    return (
        <>
        <div /*onMouseMove={handleBar}*/>
            
            <canvas id="snesCanvas" width='256' height='240' style={classes['default']}></canvas>
            
            <ControlBar handleSave={handleSave} handleLoad={handleLoad} globalRom={globalRomState} />

        </div>
        </>
    );
};
