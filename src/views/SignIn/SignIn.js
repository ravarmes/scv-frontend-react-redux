//import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
//import { Link as RouterLink, withRouter } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
//import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  //IconButton,
  TextField,
  //Link,
  Typography
} from '@material-ui/core';
//import ArrowBackIcon from '@material-ui/icons/ArrowBack';

//import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';

/*
const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};
*/

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
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
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = props => {
  const { history } = props;

  const classes = useStyles();
  const [email, setEmail] = useState();

  const handleSignIn = event => {
    event.preventDefault(); //Impedindo que o formulário seja submetido
    localStorage.setItem('email_usuario_logado', email)
    history.push('/'); //Encaminhando da página de login para a página raiz (no nosso caso, dashboard)
  };

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                Bem Vindo ao Sistema de Controle da Videolocadora
              </Typography>
              <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Rafael Vargas Mesquita
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  Professor do Instituto Federal do Espírito Santo
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12} >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
            </div>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleSignIn}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Login
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >

                </Typography>

                <Typography
                  align="center"
                  className={classes.sugestion}
                  color="textSecondary"
                  variant="body1"
                >
                  Entre com seu endereço de e-mail
                </Typography>
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  variant="outlined"
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Entrar
                </Button>

              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
