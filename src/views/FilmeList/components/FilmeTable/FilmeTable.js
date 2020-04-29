import React from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete'
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import Avatar from '@material-ui/core/Avatar';

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

const FilmeTable = props => {

  const { className, filmes, ...rest } = props;
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Código</TableCell>
                  <TableCell>Título</TableCell>
                  <TableCell>Gênero</TableCell>
                  <TableCell>Duração</TableCell>
                  <TableCell>Tipo de Filme</TableCell>
                  <TableCell>Imagem</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filmes.map(filme => {
                  return (
                    <TableRow key={filme.id}>
                      <TableCell>{filme.id}</TableCell>
                      <TableCell>{filme.titulo}</TableCell>
                      <TableCell>{filme.genero}</TableCell>
                      <TableCell>{filme.duracao}</TableCell>
                      <TableCell>{filme.tipoDeFilme.nome}</TableCell>
                      <TableCell><Avatar alt={filme.titulo} src={'data:image/png;base64,' + filme.imagem} className={classes.large} /></TableCell>                      
                      <TableCell>
                        <IconButton onClick={e => props.detail(filme)} color="secondary">
                          <BorderColorRoundedIcon />
                        </IconButton>
                        <IconButton onClick={e => props.remove(filme.id)} color="secondary">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })
                }
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>

    </Card>
  );
};

export default FilmeTable;
