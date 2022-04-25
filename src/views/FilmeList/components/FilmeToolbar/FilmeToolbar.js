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
  IconButton
} from '@material-ui/core';

import AddBoxIcon from '@material-ui/icons/AddBox';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { insert, update, detail, clear } from '../../../../store/FilmeReducer'
import { findAll as tipoDeFilmeReducer_findAll } from '../../../../store/TipoDeFilmeReducer'
import { findAll as diretorReducer_findAll } from '../../../../store/DiretorReducer'
import { findAll as artistaReducer_findAll } from '../../../../store/ArtistaReducer'

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

const FilmeToolbar = props => {

  const { className, ...rest } = props;

  const classes = useStyles();

  const [colorIconButton, setColorIconButton] = useState('default');
  const [idDiretor, setIdDiretor] = useState('');
  const [idArtista, setIdArtista] = useState('');
  const [personagem, setPersonagem] = useState('');

  useEffect(() => {
    props.tipoDeFilmeReducer_findAll();
    props.diretorReducer_findAll();
    props.artistaReducer_findAll();
  }, [])

  useEffect(() => {
    props.filme.imagem === '' ? setColorIconButton('default') : setColorIconButton('primary');
  }, [props.filme])

  const submit = (event) => {
    event.preventDefault();
    props.filme.id === 0 ? props.insert(props.filme) : props.update(props.filme);
    setIdDiretor('');
    setIdArtista('');
    setPersonagem('');
  }

  const clear = (event) => {
    setIdDiretor('');
    setIdArtista('');
    setPersonagem('');
    props.clear(props.filme);
  }

  const handleChangeText = (event) => {
    const filme = props.filme;
    filme[event.target.id] = event.target.value;
    props.detail(filme);
  }

  const handleChangeSelectTiposDeFilme = (event) => {
    const filme = props.filme;
    const tipoDeFilme = props.tiposDeFilme.find(element => element.id === event.target.value);
    filme['tipoDeFilme'] = tipoDeFilme;
    props.detail(filme);
  }

  const handleChangeSelectDiretores = (event) => {
    const diretor = props.diretores.find(element => element.id === event.target.value);
    setIdDiretor(diretor.id);
  }

  const handleChangeSelectArtistas = (event) => {
    const artista = props.artistas.find(element => element.id === event.target.value);
    setIdArtista(artista.id);
  }

  const handleButtonAdicionarDiretores = (event) => {
    if (idDiretor !== '') {
      const filme = props.filme;
      const diretor = props.diretores.find(element => element.id === idDiretor);
      filme.diretores = [...filme.diretores, diretor];
      props.detail(filme);
    }
  }

  const handleButtonAdicionarArtistas = (event) => {
    if (idArtista !== '' && personagem !== '') {
      const filme = props.filme;
      const artista = props.artistas.find(element => element.id === idArtista);
      const participacao = { personagem: '', artista: {} };
      participacao.artista = artista;
      participacao.personagem = personagem;
      filme.participacoes = [...props.filme.participacoes, participacao];
      props.detail(filme);
      setPersonagem('');
    }
  }

  const handleChangeFile = (event) => {
    const filme = props.filme;
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

      filme.imagem = strBase64;
      props.detail(filme);
    }
    reader.readAsDataURL(file);
  }

  const renderOptionsTiposDeFilme = (event) => {
    return props.tiposDeFilme.map((tipoDeFilme, i = 0) => {
      return (
        <MenuItem
          key={i}
          value={tipoDeFilme.id}
          selected={(props.filme.tipoDeFilme !== null) ? ((tipoDeFilme.id === props.filme.tipoDeFilme.id) ? 'true' : 'false') : 'false'}
        >
          {tipoDeFilme.nome}
        </MenuItem>
      )
    })
  }

  const renderOptionsDiretores = (event) => {
    return props.diretores.map((diretor, i = 0) => {
      return (
        <MenuItem key={i} value={diretor.id}>{diretor.nome}</MenuItem>
      )
    })
  }

  const renderOptionsArtistas = (event) => {
    return props.artistas.map((artista, i = 0) => {
      return (
        <MenuItem key={i} value={artista.id}>{artista.nome}</MenuItem>
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
                id="titulo"
                required
                className={classes.searchInput}
                placeholder="Título do Filme"
                label="Título: "
                fullWidth={true}
                value={props.filme.titulo}
                onChange={e => handleChangeText(e)}
              />
            </Grid>
            <Grid item md="5">
              <FormControl required fullWidth className={classes.formControl}>
                <InputLabel id="label_tiposdefilme">Tipo de Filme: </InputLabel>
                <Select
                  id="select_tiposdefilme"
                  value={props.filme.tipoDeFilme !== null ? props.filme.tipoDeFilme.id : 0}
                  onChange={e => handleChangeSelectTiposDeFilme(e)}
                >
                  {renderOptionsTiposDeFilme()}
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
            <Grid item md="6">
              <TextField
                id="genero"
                required
                className={classes.searchInput}
                placeholder="Gênero do Filme"
                label="Gênero: "
                fullWidth={true}
                value={props.filme.genero}
                onChange={e => handleChangeText(e)}
              />
            </Grid>
            <Grid item md="5">
              <TextField
                id="duracao"
                required
                className={classes.searchInput}
                placeholder="Duração do Filme"
                label="Duração (hh:mm): "
                fullWidth={true}
                value={props.filme.duracao}
                onChange={e => handleChangeText(e)}
              />
            </Grid>
            <Grid item md="1" justify="flex-end">
              <input
                id="imagem"
                accept="image/*"
                className={classes.input}
                type="file"
                src={'data:image/png;base64,' + props.filme.imagem}
                onChange={e => handleChangeFile(e)}
              />
              <label htmlFor="imagem">
                <IconButton color={colorIconButton} aria-label="upload picture" component="span">
                  <PhotoCamera />*
                </IconButton>
              </label>
            </Grid>
          </Grid>
        </div>

        <div className={classes.row}>
          <Grid container>
            <Grid item md="3">
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel id="label_diretores">Diretor *</InputLabel>
                <Select id="select_diretores" value={idDiretor} onChange={e => handleChangeSelectDiretores(e)}>
                  {renderOptionsDiretores()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md="1">
              <IconButton color="secondary" onClick={e => handleButtonAdicionarDiretores(e)}>
                <AddBoxIcon />
              </IconButton>
            </Grid>
            <Grid item md="3">
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel id="label_artistas">Artista *</InputLabel>
                <Select id="select_artistas" value={idArtista} onChange={e => handleChangeSelectArtistas(e)}>
                  {renderOptionsArtistas()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md="5">
              <TextField
                id="personagem"
                className={classes.searchInput}
                placeholder="Personagem do Artista"
                label="Personagem: "
                fullWidth={true}
                value={personagem}
                onChange={e => setPersonagem(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item md="1">
            <IconButton color="secondary" onClick={e => handleButtonAdicionarArtistas(e)}>
              <AddBoxIcon />
            </IconButton>
          </Grid>
        </div>

      </form >
    </div >
  );
};

const mapStateToProps = state => ({
  filme: state.filmeReducer.filme,
  tiposDeFilme: state.tipoDeFilmeReducer.tiposDeFilme,
  diretores: state.diretorReducer.diretores,
  artistas: state.artistaReducer.artistas
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    insert,
    update,
    detail,
    clear,
    tipoDeFilmeReducer_findAll,
    diretorReducer_findAll,
    artistaReducer_findAll
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FilmeToolbar);