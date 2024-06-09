'use client'
import React from 'react';
import dynamic from 'next/dynamic'
 
const NoSSR = dynamic(() => import('../components/snes'), { ssr: false })

const Test = () => {
    return (
        <div>
           <NoSSR/>
        </div>
    );
};

export default Test;