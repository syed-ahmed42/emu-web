import React from 'react';
import Emulator from './Emulator';

const NES = () => {
    return (
        <div style={{width: '100%', height: '100%'}}>
          <Emulator mode={'nes'} />
        </div>
    );
};

export default NES;