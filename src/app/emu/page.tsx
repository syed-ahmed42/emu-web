'use client'
import React from 'react';
import dynamic from 'next/dynamic'
import { RomContext } from '../RomContext';
import { useEffect, useContext, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'

import {db} from '../db'
 
const NoSSR = dynamic(() => import('../components/nes'), { ssr: false })

const GamerMan = () => {
    const {globalRom, setGlobalRom} = useContext(RomContext);
    const [loaded, setLoaded] = useState(false);
    
    const router = useRouter();
    const searchParams = useSearchParams();

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


    useEffect(() => {
        const loadRom = async () => {
            if (!globalRom)
            {
                console.log("Before value of game rom: " + globalRom);
                let temp = await getGameObject(db)
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

export default GamerMan;