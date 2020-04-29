import React , { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'

import { detail } from '../../../../store/FilmeReducer'

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const ItemParticipacaoTable = (props) => {

  const { className, filme, ...rest } = props;
  const classes = useStyles();

  const handleButtonRemoveItem = (idArtista, personagem) => {
    const filme = props.filme;
    const participacoes = props.filme.participacoes.filter(participacao => ((participacao.artista.id !== idArtista) || (participacao.personagem !== personagem)));
    filme.participacoes = participacoes;
    props.detail(filme);
  }

  return (
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Participações</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filme.participacoes.map(participacao => {
            return (
              <TableRow key={participacao.artista.id}>
                <TableCell>{participacao.artista.nome}</TableCell>
                <TableCell>{participacao.personagem}</TableCell>
                <TableCell>
                  <IconButton onClick={e => handleButtonRemoveItem(participacao.artista.id, participacao.personagem)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })
          }
        </TableBody>
      </Table>
  );
};

const mapStateToProps = state => ({
  filme: state.filmeReducer.filme,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    detail
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ItemParticipacaoTable);