import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import { withRouter } from 'react-router-dom';

//Conectando este componente ao redux
import { connect } from 'react-redux'
import { compose } from 'redux'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const logout = () => {
    localStorage.removeItem('email_usuario_logado')
    //props.history.push('/login')
  }

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
      <RouterLink to="/">
          <img
            alt="Logo"
            src={`${process.env.PUBLIC_URL}/images/logos/rvm.jpg`}
            height="50"
          />
         
        </RouterLink>

        <div className={classes.flexGrow} />
        <Hidden mdDown>

          <IconButton
            onClick={logout}
            className={classes.signOutButton}
            color="inherit"
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

const mapStateToProps = state => ({
  notificacoes: 0
})

//Passando vários decorators para o componente (utilizar compose)
export default compose(connect(mapStateToProps, withRouter))(Topbar);
