import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  TextField,
  Grid
} from '@material-ui/core';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { findTotaisAndQuantidadesEmprestimosOfClientesByPeriodo, detail, clear } from '../../../../store/ReportEmprestimosReducer'

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const ReportEmprestimosByClientesToolbar = props => {

  const { className, ...rest } = props;

  const classes = useStyles();

  const submit = (event) => {
    console.log('submit: props.filtro = ' + props.filtro)
    event.preventDefault();
    props.findTotaisAndQuantidadesEmprestimosOfClientesByPeriodo(props.filtro);
  }

  const clear = (event) => {
    props.clear();
  }

  const handleChangeText = (event) => {
    const filtro = props.filtro;
    filtro[event.target.id] = event.target.value;
    props.detail(filtro);
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form className={classes.form} onSubmit={submit} >
        <div className={classes.row}>
          <span className={classes.spacer} />
        </div>
        <div className={classes.row}>
          <Grid container>
            <Grid item md="5">
              <TextField
                id="di"
                required
                className={classes.searchInput}
                placeholder="yyyy-mm-dd"
                label="Data de Início: "
                fullWidth={true}
                value={props.filtro.di}
                onChange={e => handleChangeText(e)}
              />
            </Grid>
            <Grid item md="5">
              <TextField
                id="df"
                required
                className={classes.searchInput}
                placeholder="yyyy-mm-dd"
                label="Data de Fim: "
                fullWidth={true}
                value={props.filtro.df}
                onChange={e => handleChangeText(e)}
              />
            </Grid>
            <Grid item md="1">
              <Button type="submit" variant="contained" color="secondary">Listar</Button>
            </Grid>
            <Grid item md="1">
              <Button onClick={clear} variant="contained" color="default">Limpar</Button>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  report_rows: state.reportEmprestimosReducer.report_rows,
  filtro: state.reportEmprestimosReducer.filtro
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    findTotaisAndQuantidadesEmprestimosOfClientesByPeriodo,
    detail,
    clear
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ReportEmprestimosByClientesToolbar);