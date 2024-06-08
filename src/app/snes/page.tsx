'use client'
import React from 'react';
import { useEffect } from 'react';
import { Nostalgist } from 'nostalgist';

const classes = {
    full: {width: '100%', height: '100vh'},
    default: {height: '100vh', width: 'auto'}
}

const Super = () => {
    const API_ENDPOINT = process.env.LOCAL_API_ENDPOINT || '/'

    Nostalgist.configure({
        element: 'canvas',
        resolveRom(rom) {
            return `https://raw.githubusercontent.com/retrobrews/nes-games/master/31in1realgame-multicart.nes`
          },
      })

    useEffect(() => {
        
        

        async function gamer() {await Nostalgist.launch({
            core: 'fceumm',
            rom: 'flappybird.nes',
          })
        }
        gamer();
    }, [])


    



    return (
        <div>
            <canvas id="snesCanvas" width='256' height='240' style={classes['default']}></canvas>
        </div>
    );
};

export default Super;