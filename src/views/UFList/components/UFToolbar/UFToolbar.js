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
import { insert, update, detail, clear } from '../../../../store/UFReducer'

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

const UFToolbar = props => {

  const { className, ...rest } = props;

  const classes = useStyles();

  const submit = (event) => {
    event.preventDefault();
    props.uf.id === 0 ? props.insert(props.uf) : props.update(props.uf);
  }

  const clear = (event) => {
    props.clear(props.uf);
  }

  const handleChangeText = (event) => {
    const uf = props.uf;
    uf[event.target.id] = event.target.value;
    props.detail(uf);
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
                id="sigla"
                required
                className={classes.searchInput}
                placeholder="Sigla da UF"
                label="Sigla: "
                fullWidth={true}
                value={props.uf.sigla}
                onChange={e => handleChangeText(e)}
              />
            </Grid>
            <Grid item md="5">
              <TextField
                id="nome"
                required
                className={classes.searchInput}
                placeholder="Nome da UF"
                label="Nome: "
                fullWidth={true}
                value={props.uf.nome}
                onChange={e => handleChangeText(e)}
              />
            </Grid>
            <Grid item md="1">
              <Button type="submit" variant="contained" color="secondary">Salvar</Button>
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
  uf: state.ufReducer.uf
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    insert,
    update,
    detail,
    clear
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UFToolbar);