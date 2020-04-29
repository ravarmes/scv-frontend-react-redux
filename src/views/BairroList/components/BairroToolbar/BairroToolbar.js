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
import { insert, update, detail, clear } from '../../../../store/BairroReducer'
import { findByUf as cidadeReducer_findByUf } from '../../../../store/CidadeReducer'
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

const BairroToolbar = props => {

  const { className, ...rest } = props;

  const classes = useStyles();

  useEffect(() => {
    props.ufReducer_findAll();

  }, [])

  const submit = (event) => {
    event.preventDefault();
    props.bairro.id === 0 ? props.insert(props.bairro) : props.update(props.bairro);
  }

  const clear = (event) => {
    props.clear(props.bairro);
  }

  const handleChangeText = (event) => {
    const bairro = props.bairro;
    bairro[event.target.id] = event.target.value;
    props.detail(bairro);
  }

  const handleChangeSelectCidades = (event) => {
    const bairro = props.bairro;
    const cidade = props.cidades.find(element => element.id === event.target.value);
    bairro['cidade'] = cidade;
    props.detail(bairro);
  }

  const handleChangeSelectUfs = (event) => {
    const bairro = props.bairro;
    const cidade = bairro.cidade;
    const uf = props.ufs.find(element => element.id === event.target.value);
    cidade['uf'] = uf;
    bairro['cidade'] = cidade;
    props.detail(bairro);
    props.cidadeReducer_findByUf(uf);
  }

  const renderOptionsCidades = (event) => {
    return props.cidades.map((cidade, i = 0) => {
      return (
        <MenuItem key={i} value={cidade.id} selected={(cidade.id === props.bairro.cidade.id) ? 'true' : 'false'} >{cidade.nome}</MenuItem>
      )
    })
  }

  const renderOptionsUfs = (event) => {
    return props.ufs.map((uf, i = 0) => {
      return (
        <MenuItem key={i} value={uf.id} selected={(uf.id === props.bairro.cidade.uf.id) ? 'true' : 'false'} >{uf.nome}</MenuItem>
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
              <FormControl required fullWidth className={classes.formControl}>
                <InputLabel id="label_ufs">UF: </InputLabel>
                <Select id="select_ufs" value={props.bairro.cidade.uf.id} onChange={e => handleChangeSelectUfs(e)}>
                  {renderOptionsUfs()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md="5">
              <FormControl required fullWidth className={classes.formControl}>
                <InputLabel id="label_cidades">Cidade: </InputLabel>
                <Select id="select_cidades" value={props.bairro.cidade.id} onChange={e => handleChangeSelectCidades(e)}>
                  {renderOptionsCidades()}
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
        <div className={classes.row}>
          <Grid container>
            <Grid item md="10">
              <TextField
                id="nome"
                required
                className={classes.searchInput}
                placeholder="Nome do Bairro"
                label="Nome: "
                fullWidth={true}
                value={props.bairro.nome}
                onChange={e => handleChangeText(e)}
              />
            </Grid>
          </Grid>
        </div>
      </form>
    </div >
  );
};

const mapStateToProps = state => ({
  bairro: state.bairroReducer.bairro,
  ufs: state.ufReducer.ufs,
  cidades: state.cidadeReducer.cidades
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    insert,
    update,
    detail,
    clear,
    cidadeReducer_findByUf,
    ufReducer_findAll
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BairroToolbar);