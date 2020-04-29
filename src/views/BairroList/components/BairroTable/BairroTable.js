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

const BairroTable = props => {

  const { className, bairros, ...rest } = props;
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
                  <TableCell>Cidade</TableCell>
                  <TableCell>UF</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bairros.map(bairro => {
                  return (
                    <TableRow key={bairro.id}>
                      <TableCell>{bairro.id}</TableCell>
                      <TableCell>{bairro.nome}</TableCell>
                      <TableCell>{bairro.cidade.nome}</TableCell>
                      <TableCell>{bairro.cidade.uf.nome}</TableCell>
                      <TableCell>
                        <IconButton onClick={e => props.detail(bairro)} color="secondary">
                          <BorderColorRoundedIcon />
                        </IconButton>
                        <IconButton onClick={e => props.remove(bairro.id)} color="secondary">
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

export default BairroTable;
