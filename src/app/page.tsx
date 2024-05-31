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
import { RomContext } from './RomContext';



//create our styles
const classes = {
  root_box: { p: 2, border: '1px dashed grey' },
  root_container: {p: 2, border: '3px dashed red' },
  flex_display: {display: 'flex', flex: 1}
};



export default function Home() {
  const router = useRouter();
  const {globalRom, setGlobalRom} = useContext(RomContext);

  const handleUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
      const rom_data = reader.result;
      const rom_arr = new Uint8Array(rom_data);
      setGlobalRom(rom_arr);
      router.push(`/emu`)

  }
  reader.readAsArrayBuffer(file);
  
}


  return (
    <div style={classes.flex_display}>
    <Container maxWidth="sm" sx={classes.flex_display}>
    <Grid container spacing={0} direction={"column"} sx={[classes.root_container, classes.flex_display]}>
    <Box component="section" sx={classes.root_box}>
      <Grid container spacing={0} sx={{display: "flex"}}>
        <Link href={{
          pathname: '/emu',
          query: { game: 'sp_gulls' }
        }} style={classes.flex_display}>
        <Card sx={{ flex: 1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="wallpaper.jpeg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Lizard
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
        
    <Link href={{
          pathname: '/emu',
          query: { game: 'bobli' }
        }} style={classes.flex_display}>
    <Card sx={{ flex: 1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="wallpaper.jpeg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Lizard
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
        
    <Link href={{
          pathname: '/emu',
          query: { game: 'twin_d' }
        }} style={classes.flex_display}>
    <Card sx={{ flex: 1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="wallpaper.jpeg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Lizard
          </Typography>
      
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
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
