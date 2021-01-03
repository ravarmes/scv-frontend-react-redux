import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';

const useStyles = makeStyles(theme => ({
  
  root: {
    backgroundColor: theme.palette.background.default,
    height: '80%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/telas/fundo.png)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.black,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.black
  },
  bio: {
    color: theme.palette.black
  }



}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={12} >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h1" >
                <p>Bem Vindo ao</p> 
                <p>Sistema de Controle da Videolocadora</p>
                <p><LocalMoviesIcon fontSize="large"/></p>                
              </Typography>
              <div className={classes.person}>
                <Typography className={classes.name} variant="body1" >
                  Rafael Vargas Mesquita
                </Typography>
                <Typography className={classes.bio} variant="body2" >
                  Professor do Instituto Federal do Espírito Santo
                </Typography>
              </div>
            </div>

          </div>

        </Grid>
      </Grid>

    </div>
  );
};

export default Dashboard;
