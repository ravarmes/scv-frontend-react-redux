import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import MovieIcon from '@material-ui/icons/Movie';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import StarIcon from '@material-ui/icons/Star';
import AssessmentIcon from '@material-ui/icons/Assessment';
//import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Artistas',
      href: '/artistas',
      icon: <StarIcon />
    },
    {
      title: 'Empréstimos',
      href: '/emprestimos',
      icon: <MonetizationOnIcon />
    },
    {
      title: 'Filmes',
      href: '/filmes',
      icon: <MovieIcon />
    },
    {
      title: 'Bairros',
      href: '/bairros',
      icon: <EditLocationIcon />
    },
    {
      title: 'Cidades',
      href: '/cidades',
      icon: <EditLocationIcon />
    },
    {
      title: 'UFs',
      href: '/ufs',
      icon: <EditLocationIcon />
    },
    {
      title: 'Empréstimos / Clientes',
      href: '/report/findTotaisAndQuantidadesEmprestimosOfClientesByPeriodo',
      icon: <AssessmentIcon />
    },
    {
      title: 'Login',
      href: '/login',
      icon: <LockOpenIcon />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
