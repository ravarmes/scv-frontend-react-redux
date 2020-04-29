import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '70%'
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
    backgroundImage: 'url(/images/telas/fundo2.jpg)',
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
      
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h1" >
              <LocalMoviesIcon />Bem Vindo ao Sistema de Controle da Videolocadora
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
        
    </div>
  );
};

export default Dashboard;
