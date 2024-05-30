import Image from "next/image";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


//create our styles
const classes = {
  root_box: { p: 2, border: '1px dashed grey' },
  root_container: {p: 2, border: '3px dashed red' },
  flex_display: {display: 'flex', flex: 1}
};

export default function Home() {
  return (
    <div style={classes.flex_display}>
    <Container maxWidth="sm" sx={classes.flex_display}>
    <Grid container spacing={0} direction={"column"} sx={[classes.root_container, classes.flex_display]}>
    <Box component="section" sx={classes.root_box}>
      <Grid container spacing={0} sx={{display: "flex"}}>
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
      </Grid>
    </Box>
    <Box component="section" sx={classes.root_box}>
      This Box renders as an HTML section element.
    </Box>
    <Box component="section" sx={classes.root_box}>
      This Box renders as an HTML section element.
    </Box>
  
</Grid>
</Container>
    </div>
  );
}
