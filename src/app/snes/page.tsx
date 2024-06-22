'use client'
import React from 'react';
import dynamic from 'next/dynamic'
import { RomContext } from '../RomContext';
import { useEffect, useContext, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { getGameObject } from '../utilities/dbtil'

import {db} from '../db'
 
const NoSSR = dynamic(() => import('../components/snes'), { ssr: false })

const TestChild = () => {
    const {globalRom, setGlobalRom} = useContext(RomContext);
    const [loaded, setLoaded] = useState(false);
    
    const router = useRouter();
    const searchParams = useSearchParams();

    


    useEffect(() => {
        const loadRom = async () => {
            if (!globalRom)
            {
                console.log("Before value of game rom: " + globalRom);
                let temp = await getGameObject(db, searchParams)
                setGlobalRom(temp);
                console.log("After value of game rom: " + globalRom);
            }
            if (globalRom)
            {
                setLoaded(true);
            }
        }
        loadRom();
        
    }, [])


    return (
        <div>
            
           {globalRom ? <NoSSR globalRom={globalRom}/> : <div>Gamer</div>}
           
        </div>
    );
};

const Test = () => {

    return (
    <div>
        <Suspense>
            <TestChild/>
        </Suspense>
    </div>
    )
}

export default Test;