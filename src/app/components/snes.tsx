import React from 'react';
import Emulator from './Emulator';

const SNES = () => {
    return (
        <div style={{width: '100%', height: '100%'}}>
          <Emulator mode={'snes'} />
        </div>
    );
};

export default SNES;