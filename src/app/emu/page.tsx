'use client'
import React from 'react';
import dynamic from 'next/dynamic'
import { RomContext } from '../RomContext';
import { useEffect, useContext, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { getGameObject } from '../utilities/dbtil'
import Popup from '../components/Popup'


import {db} from '../db'
 
const NoSSR = dynamic(() => import('../components/nes'), { ssr: false })

const GamerManChild = () => {
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
        <div>
            
           {globalRom ? <NoSSR globalRom={globalRom}/> : <div>Gamer</div>}
           <Popup open={loaded} setOpen={setLoaded}/>
        </div>
    );
};

const GamerMan = () => {

    return (
    <div>
        <Suspense>
            <GamerManChild/>
        </Suspense>
    </div>
    )
}

export default GamerMan;