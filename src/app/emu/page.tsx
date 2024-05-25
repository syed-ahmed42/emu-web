"use client"
import React, { useState, useEffect } from 'react';
import init, { WasmNes, Button } from "../../../public/nes_rust_wasm";


const Emulator = () => {
    const temp_link = "https://22e7363121a89b.lhr.life/mario.nes"
    const [show, setShow] = useState(true);


    const run = (wasm, romContentArray) => {
        const width = 256;
        const height = 240;
        const canvas = document.getElementById('nesCanvas');
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(width, height);
        const pixels = new Uint8Array(imageData.data.buffer);
        const nes = WasmNes.new();
        nes.set_rom(romContentArray);

        const setupAudio = (wasm, nes) => {
            const audioContext = AudioContext || webkitAudioContext;
    
            if (audioContext === undefined) {
              throw new Error('This browser seems not to support AudioContext.');
            }
    
            const bufferLength = 4096;
            const context = new audioContext({sampleRate: 44100});
            const scriptProcessor = context.createScriptProcessor(bufferLength, 0, 1);
    
            scriptProcessor.onaudioprocess = e => {
              const data = e.outputBuffer.getChannelData(0);
              nes.update_sample_buffer(data);
              // Adjust volume
              for (let i = 0; i < data.length; i++) {
                data[i] *= 0.25;
              }
            };
    
            scriptProcessor.connect(context.destination);
          };

        const stepFrame = () => {
            requestAnimationFrame(stepFrame);
            // Run emulator until screen is refreshed
            nes.step_frame();
            // Load screen pixels and render to canvas
            nes.update_pixels(pixels);
            ctx.putImageData(imageData, 0, 0);
          };

          const getButton = keyCode => {
            switch (keyCode) {
              case 32: // space
                return Button.Start;
              case 37: // Left
                return Button.Joypad1Left;
              case 38: // Up
                return Button.Joypad1Up;
              case 39: // Right
                return Button.Joypad1Right;
              case 40: // Down
                return Button.Joypad1Down;
              case 50: // 2
                return Button.Joypad2Down;
              case 52: // 4
                return Button.Joypad2Left;
              case 54: // 6
                return Button.Joypad2Right;
              case 56: // 8
                return Button.Joypad2Up;
              case 65: // A
                return Button.Joypad1A;
              case 66: // B
                return Button.Joypad1B;
              case 82: // R
                return Button.Reset;
              case 83: // S
                return Button.Select;
              case 88: // X
                return Button.Joypad2A;
              case 90: // Z
                return Button.Joypad2B;
              default:
                return null; 
            }
          };

          window.addEventListener('keydown', event => {
            const button = getButton(event.keyCode);
            if (button === null) {
              return;
            }
            nes.press_button(button);
            event.preventDefault();
          }, false);
  
          window.addEventListener('keyup', event => {
            const button = getButton(event.keyCode);
            if (button === null) {
              return;
            }
            nes.release_button(button);
            event.preventDefault();
          }, false);

          
        setupAudio(wasm, nes);
        nes.bootup();
        stepFrame();
    }
    

    const start = async (rom) => {
        setShow(false);
        //const romBuffer = await fetch("http://localhost:64468/mario.nes").then(res => res.arrayBuffer());
        //const romBuffer = await fetch(temp_link).then(res => res.arrayBuffer());
        //const input = import.meta.url.replace(/\.js$/, '_bg.wasm');
        const romBuffer = await fetch("../../../public/mario.nes").then(res => res.arrayBuffer());
        //const romBuffer = rom.arrayBuffer();
        init()
          .then(wasm => run(wasm, new Uint8Array(romBuffer)))
          .catch(error => console.error(error));
    }

    return (
        <div>
            <canvas id="nesCanvas" width="256" height="240"></canvas>
            {show && <button onClick={start}>Start</button>}
        </div>
    );
};

export default Emulator