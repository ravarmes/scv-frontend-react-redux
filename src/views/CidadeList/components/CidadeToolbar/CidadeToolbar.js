import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { insert, update, detail, clear } from '../../../../store/CidadeReducer'
import { findAll as ufReducer_findAll } from '../../../../store/UFReducer'

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

const CidadeToolbar = props => {

  const { className, ...rest } = props;

  const classes = useStyles();

  useEffect(() => {
    props.ufReducer_findAll();
  }, [])

  const submit = (event) => {
    event.preventDefault();
    props.cidade.id === 0 ? props.insert(props.cidade) : props.update(props.cidade);
  }

  const clear = (event) => {
    props.clear(props.cidade);
  }

  const handleChangeText = (event) => {
    const cidade = props.cidade;
    cidade[event.target.id] = event.target.value;
    props.detail(cidade);
  }

  const handleChangeSelect = (event) => {
    const cidade = props.cidade;
    const uf = props.ufs.find(element => element.id === event.target.value);
    cidade['uf'] = uf;
    props.detail(cidade);
  }

  const renderOptions = (event) => {
    return props.ufs.map((uf, i = 0) => {
      return (
        <MenuItem key={i} value={uf.id} selected={(uf.id === props.cidade.uf.id) ? 'true' : 'false'} >{uf.nome}</MenuItem>
      )
    })
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
                id="nome"
                required
                className={classes.searchInput}
                placeholder="Nome da Cidade"
                label="Nome: "
                fullWidth={true}
                value={props.cidade.nome}
                onChange={e => handleChangeText(e)}
              />
            </Grid>
            <Grid item md="5">
              <FormControl required fullWidth className={classes.formControl}>
                <InputLabel id="label_ufs">UF: </InputLabel>
                <Select id="select_ufs" value={props.cidade.uf.id} onChange={e => handleChangeSelect(e)}>
                  {renderOptions()}
                </Select>
              </FormControl>
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
    </div >
  );
};

const mapStateToProps = state => ({
  cidade: state.cidadeReducer.cidade,
  ufs: state.ufReducer.ufs
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    insert,
    update,
    detail,
    clear,
    ufReducer_findAll
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CidadeToolbar);