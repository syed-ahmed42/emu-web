'use client'
import React from 'react';
import dynamic from 'next/dynamic'
import { RomContext } from '../RomContext';
import { useEffect, useContext, useState, useRef, createContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { getGameObject } from '../utilities/dbtil'
import Popup from '../components/Popup'
import { OverlayContext } from '../OverlayContext';
import StateNotification from './StateNotification';

import {db} from '../db'

const EmuOverlayChild = ({children}) => {
    const {globalRom, setGlobalRom} = useContext(RomContext);
    const [loaded, setLoaded] = useState(false);
    
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleClick = () => {
        setLoaded(!loaded);
    }


    useEffect(() => {
        const loadRom = async () => {
            if (!globalRom)
            {
                setLoaded(true)
                console.log("Before value of game rom: " + globalRom);
                let temp = await getGameObject(db, searchParams)
                setGlobalRom(temp);
                console.log("After value of game temp: " + temp.file.name);
                console.log("After value of game rom: " + globalRom);
            }
            if (globalRom)
            {
                setLoaded(false);
            }
        }
        loadRom();
        
    }, [])


    return (
        <div style={{width: '100%', height: '100%'}}>
            <OverlayContext.Provider value={globalRom}>
                {globalRom ? children : <div>Gamer</div>}
                <Popup open={loaded} setOpen={setLoaded}/>
                
           </OverlayContext.Provider>
        </div>
    );
};

const EmuOverlay = ({children}) => {

    return (
    <div style={{position: 'absolute', width: '100%', height: '100%'}}>
        <Suspense>
            <EmuOverlayChild>
                {children}
            </EmuOverlayChild>
        </Suspense>
    </div>
    )
}

export default EmuOverlay;