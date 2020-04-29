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

const ItemDiretorTable = (props) => {

  const { className, filme, ...rest } = props;
  const classes = useStyles();

  const handleButtonRemoveItem = (idDiretor) => {
    const filme = props.filme;
    const diretores = props.filme.diretores.filter(diretor => diretor.id !== idDiretor);
    filme.diretores = diretores;
    props.detail(filme);
  }

  return (
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Diretores</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filme.diretores.map(diretor => {
            return (
              <TableRow key={diretor.id}>
                <TableCell>{diretor.nome}</TableCell>
                <TableCell>
                  <IconButton onClick={e => handleButtonRemoveItem(diretor.id)} color="secondary">
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemDiretorTable);