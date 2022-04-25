import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@material-ui/core';

import AddBoxIcon from '@material-ui/icons/AddBox';


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { insert, update, detail, clear } from '../../../../store/EmprestimoReducer'
import { findAll as clienteReducer_findAll } from '../../../../store/ClienteReducer'
import { findAll as filmeReducer_findAll } from '../../../../store/FilmeReducer'
import { findByFilme as fitaReducer_findByFilme } from '../../../../store/FitaReducer'

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

const EmprestimoToolbar = props => {

  const { className, ...rest } = props;

  const classes = useStyles();

  const [data, setData] = useState('');
  const [idFilme, setIdFilme] = useState('');
  const [idFita, setIdFita] = useState('');

  useEffect(() => {
    setData(calcularDataEmprestimo());
    props.clienteReducer_findAll();
    props.filmeReducer_findAll();
  }, [])

  const submit = (event) => {
    event.preventDefault();
    props.emprestimo.data = calcularDataEmprestimo();
    props.emprestimo.id === 0 ? props.insert(props.emprestimo) : props.update(props.emprestimo);
    setIdFilme('');
    setIdFita('');
    setData(calcularDataEmprestimo());
  }

  const clear = (event) => {
    props.clear(props.emprestimo);
    setIdFilme('');
    setIdFita('');
  }

  const handleChangeText = (event) => {
    const emprestimo = props.emprestimo;
    emprestimo[event.target.id] = event.target.value;
    props.detail(emprestimo);
  }

  const handleChangeSelectClientes = (event) => {
    const emprestimo = props.emprestimo;
    const cliente = props.clientes.find(element => element.id === event.target.value);
    emprestimo.cliente = cliente;
    props.detail(emprestimo);
  }

  const handleChangeSelectFilmes = (event) => {
    const filme = props.filmes.find(element => element.id === event.target.value);
    setIdFilme(filme.id);
    props.fitaReducer_findByFilme(filme);
  }

  const handleChangeSelectFitas = (event) => {
    const fita = props.fitas.find(element => element.id === event.target.value);
    setIdFita(fita.id);
  }

  const renderOptionsClientes = (event) => {
    return props.clientes.map((cliente, i = 0) => {
      return (
        <MenuItem key={i} value={cliente.id} selected={(cliente.id === props.emprestimo.cliente.id) ? 'true' : 'false'} >{cliente.nome}</MenuItem>
      )
    })
  }

  const renderOptionsFilmes = (event) => {
    return props.filmes.map((filme, i = 0) => {
      return (
        <MenuItem key={i} value={filme.id}>{filme.titulo}</MenuItem>
      )
    })
  }

  const renderOptionsFitas = (event) => {
    return props.fitas.map((fita, i = 0) => {
      return (
        <MenuItem key={i} value={fita.id}>{fita.id}</MenuItem>
      )
    })
  }

  const handleButtonAdicionarFitas = (event) => {
    if (idFita !== '') {
      const emprestimo = props.emprestimo;
      const fita = props.fitas.find(element => element.id === idFita);
      const item = { valor: 0, entrega: '', fita: {} };
      item.fita = fita;
      item.valor = fita.filme.tipoDeFilme.preco;
      item.entrega = calcularDataEntregaItem(data, fita.filme.tipoDeFilme.prazo);
      emprestimo.itens = [...props.emprestimo.itens, item];
      emprestimo.valor = emprestimo.valor + item.valor;
      props.detail(emprestimo);
    }
  }

  const calcularDataEmprestimo = () => {
    var data = new Date()
    var dia = data.getDate();
    var mes = data.getMonth();
    var ano = data.getFullYear();
    data = ano + '-' + (++mes) + '-' + dia;
    //data = dia + '/' + (++mes) + '/' + ano;
    return data;
  }

  const calcularDataEntregaItem = (dataString, dias) => {
    let data = new Date(dataString);
    data.setDate(data.getDate() + dias);
    var dia = data.getDate();
    var mes = data.getMonth();
    var ano = data.getFullYear();
    dataString = ano + '-' + (++mes) + '-' + dia;
    return dataString;
  }

  const formatarData = (data) => {
    const split = data.split('-');
    const novadata = split[2] + "/" + split[1] + "/" + split[0];
    return novadata;
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
            <Grid item md="6">
              <FormControl required fullWidth className={classes.formControl}>
                <InputLabel id="label_clientes">Cliente</InputLabel>
                <Select id="select_clientes" value={props.emprestimo.cliente.id} onChange={e => handleChangeSelectClientes(e)}>
                  {renderOptionsClientes()}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md="2">
              <TextField
                id="Data"
                label="Data: "
                type="text"
                disabled
                required
                className={classes.searchInput}
                fullWidth={false}
                value={formatarData(data)}
                onChange={e => handleChangeText(e)}
              />
            </Grid>

            <Grid item md="2">
              <TextField
                id="valor"
                label="Valor (R$): "
                type="number"
                disabled
                required
                className={classes.searchInput}
                fullWidth={false}
                value={props.emprestimo.valor}
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
        <div className={classes.row}>
          <Grid container>
            <Grid item md="6">
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel id="label_filmes">Filme *</InputLabel>
                <Select id="select_filmes" value={idFilme} onChange={e => handleChangeSelectFilmes(e)}>
                  {renderOptionsFilmes()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md="4">
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel id="label_fitas">Fita *</InputLabel>
                <Select id="select_fitas" value={idFita} onChange={e => handleChangeSelectFitas(e)}>
                  {renderOptionsFitas()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md="2">
              <IconButton color="secondary" onClick={e => handleButtonAdicionarFitas(e)}>
                <AddBoxIcon />
              </IconButton>
            </Grid>

          </Grid>
        </div>
      </form>
    </div >
  );
};

const mapStateToProps = state => ({
  emprestimo: state.emprestimoReducer.emprestimo,
  clientes: state.clienteReducer.clientes,
  filmes: state.filmeReducer.filmes,
  fitas: state.fitaReducer.fitas
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    insert,
    update,
    detail,
    clear,
    clienteReducer_findAll,
    filmeReducer_findAll,
    fitaReducer_findByFilme
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EmprestimoToolbar);