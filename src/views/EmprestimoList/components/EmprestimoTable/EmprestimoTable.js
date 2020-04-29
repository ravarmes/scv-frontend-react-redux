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

const EmprestimoTable = props => {

  const { className, emprestimos, ...rest } = props;
  const classes = useStyles();

  const formatarData = (data) => {
    const split = data.split('-');
    const novadata = split[2] + "/" + split[1] + "/" + split[0];
    return novadata;
  }

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
                  <TableCell align="center" colspan="5"><b>Empréstimos</b></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Código</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {emprestimos.map(emprestimo => {
                  return (
                    <TableRow key={emprestimo.id}>
                      <TableCell>{emprestimo.id}</TableCell>
                      <TableCell>{formatarData(emprestimo.data)}</TableCell>
                      <TableCell>{emprestimo.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                      <TableCell>{emprestimo.cliente.nome}</TableCell>
                      <TableCell>
                        <IconButton onClick={e => props.detail(emprestimo)} color="secondary">
                          <BorderColorRoundedIcon />
                        </IconButton>
                        <IconButton onClick={e => props.remove(emprestimo.id)} color="secondary">
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

export default EmprestimoTable;
