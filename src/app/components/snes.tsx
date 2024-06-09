'use client'
import React from 'react';
import { useEffect, useContext } from 'react';
import { Nostalgist } from 'nostalgist';
import { RomContext } from '../RomContext';

const classes = {
    full: {width: '100%', height: '100vh'},
    default: {height: '100vh', width: 'auto'}
}

export default function Super () {
    const API_ENDPOINT = process.env.LOCAL_API_ENDPOINT || '/'

    const {globalRom, setGlobalRom} = useContext(RomContext);


    const handleUpload = (event) => {
        console.log("Handle upload is runnign")
        const file = event.target.files[0];
        async function gamer() {await Nostalgist.launch({
            core: 'snes9x',
            rom: file,
          })
        }
        gamer();

        
      }


    Nostalgist.configure({
        element: 'canvas',
        resolveRom(rom) {
            //return `https://raw.githubusercontent.com/retrobrews/nes-games/master/31in1realgame-multicart.nes`
            //return `https://raw.githubusercontent.com/syed-ahmed42/emu-web/main/public/nek.sfc`
            return `/nek.sfc`
          },
          resolveCoreWasm(core) {
            return `/snes9x_libretro.wasm`
          },
          resolveCoreJs(core) {
            return `/snes9x_libretro.js`
          },
      })

    useEffect(() => {
        
        let game;
        if (true)
        {
        async function gamer() {game = await Nostalgist.launch({
            core: 'snes9x',
            rom: 'nek.sfc',
          })
        }
        gamer();
        }

        return () => {
            game.exit();
        }
    }, [])


    



    return (
        <div>
            <canvas id="snesCanvas" width='256' height='240' style={classes['default']}></canvas>
        </div>
    );
};
