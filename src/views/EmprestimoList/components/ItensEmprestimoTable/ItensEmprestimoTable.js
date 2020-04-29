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

const ItensEmprestimoTable = props => {

  const { className, emprestimo, ...rest } = props;
  const classes = useStyles();

  const handleButtonRemoveItem = (idFita) => {
    const emprestimo = props.emprestimo;
    const item = props.emprestimo.itens.find(item => item.fita.id === idFita);
    const itens = props.emprestimo.itens.filter(item => item.fita.id !== idFita);
    emprestimo.itens = itens;
    emprestimo.valor = emprestimo.valor - item.valor;
    props.detail(emprestimo);
  }

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
                  <TableCell align="center" colspan="5"><b>Itens de Empréstimo</b></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Filme</TableCell>
                  <TableCell>Fita</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Entrega</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {emprestimo.itens.map(item => {
                  return (
                    <TableRow key={item.fita.id}>
                      <TableCell>{item.fita.filme.titulo}</TableCell>
                      <TableCell>{item.fita.id}</TableCell>
                      <TableCell>{item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                      <TableCell>{formatarData(item.entrega)}</TableCell>
                      <TableCell>
                        <IconButton onClick={e => handleButtonRemoveItem(item.fita.id)} color="secondary">
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

export default ItensEmprestimoTable;
