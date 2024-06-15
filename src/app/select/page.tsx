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
import { useLiveQuery } from "dexie-react-hooks";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import {db} from '../db'



//create our styles
const classes = {
  root_box: { p: 2, border: '1px dashed grey' },
  root_container: {p: 2, border: '3px dashed red'},
  flex_display: {display: 'flex', flex: 1},
  select_styles: {flexDirection: 'column'},
};

async function addGame(event) {
  try {
    const file = event.target.files[0];

    // Add the new friend!
    const id = await db.games.add({
      file: file,
      name: 'twin_d',
      save: 'mySave'
    });
    console.log("This is the game id: " + id)
    
  } catch (error) {
    console.log("OOPS! Something went wrong while trying to create a game entry");
  }
}


async function deleteGame(id) {
  try {
    // Add the new friend!
    await db.games.delete(id);

    
  } catch (error) {
    console.log("OOPS! Something went wrong while trying to delete a game entry");
  }
}





export default function Home() {
  const router = useRouter();
  const myGames = useLiveQuery(() => db.games.toArray());
  const {globalRom, setGlobalRom} = useContext(RomContext);
  const API_ENDPOINT = process.env.LOCAL_API_ENDPOINT || '/';

  const handleUpload = (event) => {
  console.log("Handle upload is runnign")
  const file = event.target.files[0];
  const file_name = file.name;
  const reader = new FileReader();
  reader.onload = () => {
      const rom_data = reader.result;
      const rom_arr = new Uint8Array(rom_data);
      setGlobalRom(rom_arr);
      router.push(`/emu`)

  }

  if (file_name.endsWith('.nes'))
  {
    reader.readAsArrayBuffer(event.target.files[0]);
  }
  else if (file_name.endsWith('.sfc') || file_name.endsWith('.smc'))
  {
    setGlobalRom(file);
    router.push(`/snes`)
  }
}

const libraryGameStart = async (id) => {
  //console.log("Start the game!!!")
  const gameObj = await db.games.get(id);
  setGlobalRom(gameObj);
  router.push('/snes')
  
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
            Neko
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
            Nekotako
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



    <Box component="section" sx={[classes.root_box]}>
      <Grid container spacing={0} sx={{display: "flex"}}>
{myGames?.map((myGame) => (
        <Grid xs='auto'>
        <Card sx={{ flex: 1, position: 'relative' }}>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ position: 'absolute',
              top: '0',
              right: '0',
              zIndex: '1',
               }}
               onClick={() => deleteGame(myGame.id)}
          >
            <CloseIcon/>
          </IconButton>
        <CardActionArea onClick={() => libraryGameStart(myGame.id)}>
         
          <CardMedia
        sx={{ height: 140 }}
        image="/twin_gif.gif"
        title="green iguana"
      />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Twin Dragons
            </Typography>
        
          </CardContent>
        </CardActionArea>
      </Card>
      </Grid>
      ))}
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
    /*onChange={handleUpload}*/
    onChange={addGame}
    hidden
  />
    </B>
    <Typography gutterBottom component="div">
            Currently accept only .nes files (NTSC Preferred)
          </Typography>
    </Box>
    
  
</Grid>
</Container>
    <button onClick={addGame}>Add game</button>
    <button onClick={deleteGame}>Remove All</button>
    <ul>
      {myGames?.map((myGame) => (
        <li key={myGame.id} onClick={() => libraryGameStart(myGame.id)}>
          {myGame.name}
        </li>
      ))}
    </ul>
    </div>
  );
}
