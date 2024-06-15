import React from 'react';
import { Icon } from '@mui/material';

const KeyBoardIcons = ({iconName, fontSize}) => {
    return (
        <div style={{fontSize: fontSize}}>
            <Icon fontSize='inherit' style={{textAlign: 'center'}}>
                <img src={`/keyboard/${iconName}.svg`} alt="" style={{height: '100%'}}/>
            </Icon>
        </div>
       
    );
};

export default KeyBoardIcons;
