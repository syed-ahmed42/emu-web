'use client'
import React from 'react';
import dynamic from 'next/dynamic'
import { RomContext } from '../RomContext';
import { useEffect, useContext, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { getGameObject } from '../utilities/dbtil'
import Popup from '../components/Popup'
import EmuOverlay from '../components/EmuOverlay';


import {db} from '../db'
 
const NoSSR = dynamic(() => import('../components/nes'), { ssr: false })

const NesPage = () => {
    
    return (
        <EmuOverlay>
            <NoSSR/>
        </EmuOverlay>
    )
};


export default NesPage;