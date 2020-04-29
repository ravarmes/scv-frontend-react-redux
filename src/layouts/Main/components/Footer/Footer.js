import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Footer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography variant="body1">
        &copy;{' '}
        <Link
          component="a"
          href="http://lattes.cnpq.br/6616283627544820"
          target="_blank"
        >
          Rafael Vargas Mesquita
        </Link>
        . 2020
      </Typography>
      <Typography variant="caption">
        Aplicação Front-End utilizando React e Redux - Back-End em Spring está em{' '} 
        <Link
          component="a"
          href="https://github.com/ravarmes/scv-backend-spring"
          target="_blank"
        >
          ravarmes/scv-backend-spring
        </Link>
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
