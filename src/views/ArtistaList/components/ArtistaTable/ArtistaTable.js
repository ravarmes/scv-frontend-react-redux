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

const ArtistaTable = props => {

  const { className, artistas, ...rest } = props;
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
                  <TableCell>Nome</TableCell>
                  <TableCell>Imagem</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {artistas.map(artista => {
                  return (
                    <TableRow key={artista.id}>
                      <TableCell>{artista.id}</TableCell>
                      <TableCell>{artista.nome}</TableCell>
                      <TableCell><Avatar alt={artista.nome} src={'data:image/png;base64,' + artista.imagem} className={classes.large} /></TableCell>
                      <TableCell>
                        <IconButton onClick={e => props.detail(artista)} color="secondary">
                          <BorderColorRoundedIcon />
                        </IconButton>
                        <IconButton onClick={e => props.remove(artista.id)} color="secondary">
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

export default ArtistaTable;
