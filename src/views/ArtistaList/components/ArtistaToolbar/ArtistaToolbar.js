import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  TextField,
  Grid,
  IconButton
} from '@material-ui/core';

import PhotoCamera from '@material-ui/icons/PhotoCamera';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { insert, update, detail, clear } from '../../../../store/ArtistaReducer'

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
  },
  input: {
    display: 'none',
  }
}));

const ArtistaToolbar = props => {

  const { className, ...rest } = props;

  const classes = useStyles();

  const [colorIconButton, setColorIconButton] = useState('default');

  useEffect(() => {
    props.artista.imagem === '' ? setColorIconButton('default') : setColorIconButton('primary');
  }, [props.artista])

  const submit = (event) => {
    event.preventDefault();
    props.artista.id === 0 ? props.insert(props.artista) : props.update(props.artista);
  }

  const clear = (event) => {
    props.clear(props.artista);
  }

  const handleChangeText = (event) => {
    const artista = props.artista;
    artista[event.target.id] = event.target.value;
    props.detail(artista);
  }

  const handleChangeFile = (event) => {
    const artista = props.artista;
    var strBase64;
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      strBase64 = reader.result;

      if (strBase64.indexOf("png") > -1) {
        strBase64 = strBase64.slice(22); //removendo: "data:image/png;base64,"
      } else if (strBase64.indexOf("jpeg") > -1) {
        strBase64 = strBase64.slice(23); //removendo: "data:image/jpeg;base64,"
      } else {
        alert("A imagem não é válida!");
      }

      artista.imagem = strBase64;
      props.detail(artista);
    }
    reader.readAsDataURL(file);
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
            <Grid item md="8">
              <TextField
                id="nome"
                required
                className={classes.searchInput}
                placeholder="Nome do Artista"
                label="Nome: "
                fullWidth={true}
                value={props.artista.nome}
                onChange={e => handleChangeText(e)}
              />
            </Grid>
            <Grid item md="2">
              <input
                id="imagem"
                accept="image/*"
                className={classes.input}
                type="file"
                src={'data:image/png;base64,' + props.artista.imagem}
                onChange={e => handleChangeFile(e)}
              />
              <label htmlFor="imagem">
                <IconButton color={colorIconButton} aria-label="upload picture" component="span">
                  <PhotoCamera />*
                </IconButton>
              </label>
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
  artista: state.artistaReducer.artista
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    insert,
    update,
    detail,
    clear
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ArtistaToolbar);