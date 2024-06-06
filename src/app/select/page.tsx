'use client'
import React, { useState, useEffect, useContext } from 'react';
import Image from "next/image";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {default as B} from '@mui/material/Button';
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import { RomContext } from '../RomContext';



//create our styles
const classes = {
  root_box: { /*p: 2, border: '1px dashed grey'*/ },
  root_container: {/*p: 2, border: '3px dashed red' */},
  flex_display: {display: 'flex', flex: 1},
  select_styles: {flexDirection: 'column'},
};



export default function Home() {
  const router = useRouter();
  const {globalRom, setGlobalRom} = useContext(RomContext);
  const API_ENDPOINT = process.env.LOCAL_API_ENDPOINT || '/';

  const handleUpload = (event) => {
  console.log("Handle upload is runnign")
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
      const rom_data = reader.result;
      const rom_arr = new Uint8Array(rom_data);
      setGlobalRom(rom_arr);
      router.push(`/emu`)

  }
  reader.readAsArrayBuffer(event.target.files[0])
}

  const startGame = async (rom) => {
    if (!gameInLibrary(rom)) throw new Error("Game not found in library.")
    const rom_string = rom + '.nes'
    const romBuffer = await fetch(API_ENDPOINT + rom_string).then(res => res.arrayBuffer());
    const romBuffer8t = new Uint8Array(romBuffer)
    setGlobalRom(romBuffer8t);
    router.push(`/emu`)
  }

  const gameInLibrary = (title) => {
    const games = {
      'sp_gulls': 0,
      'bobli': 1,
      'twin_d': 2,
    };
    for (const [key, value] of Object.entries(games)) {
      if (key.localeCompare(title) === 0)
      {
          return true;
      }
    }
    return false;
  }
  



  return (
    <div style={classes.flex_display}>
    <Container maxWidth="sm" sx={classes.flex_display}>
    <Grid container spacing={0} direction={"column"} justifyContent="center" alignItems='center' sx={[classes.root_container, classes.flex_display]}>
    <Box component="section" sx={classes.root_box}>
    <Typography gutterBottom variant="h6" component="div">
            Select a game
          </Typography>
    </Box>
    <Box component="section" sx={[classes.root_box]}>
      <Grid container spacing={0} sx={{display: "flex"}}>
        <Card onClick={() => startGame('sp_gulls')} sx={{ flex: 1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="sp_gif.gif"
          alt="Space Gulls Gameplay Gif"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Space Gulls
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        
    
    <Card onClick={() => startGame('bobli')} sx={{ flex: 1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="bobli_gif.gif"
          alt="Bobl Gameplay Gif"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Bobl
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    
        
    <Card onClick={() => startGame('twin_d')} sx={{ flex: 1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="twin_gif.gif"
          alt="Twin Dragons Gameplay Gif"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Twin Dragons
          </Typography>
      
        </CardContent>
      </CardActionArea>
    </Card>
      </Grid>
    </Box>
    <Box component="section" sx={classes.root_box}>
    <Typography gutterBottom variant="h6" component="div">
            OR
          </Typography>
    </Box>
    <Box component="section" sx={classes.root_box}>
    <B variant="contained" component="label">
      Upload Game
      <input
    type="file"
    onChange={handleUpload}
    hidden
  />
    </B>
    <Typography gutterBottom component="div">
            Currently accept only .nes files (NTSC Preferred)
          </Typography>
    </Box>
    
  
</Grid>
</Container>

    </div>
  );
}
