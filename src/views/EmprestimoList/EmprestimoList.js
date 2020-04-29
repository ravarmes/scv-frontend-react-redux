import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Alert } from '../../components/Alert';
import { findAll, insert, update, remove, detail } from '../../store/EmprestimoReducer'
import { EmprestimoToolbar, EmprestimoTable, ItensEmprestimoTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const EmprestimoList = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.findAll();
  }, [])

  return (
    <div className={classes.root}>
      <EmprestimoToolbar insert={props.insert} update={props.update} />
      <div className={classes.content}>
        <ItensEmprestimoTable detail={props.detail} emprestimo={props.emprestimo} />
      </div>
      <div className={classes.content}>
        <EmprestimoTable detail={props.detail} remove={props.remove} emprestimos={props.emprestimos} />
      </div>
      <Alert status={props.alert_status} mensagem={props.alert_description} closeDialog={props.closeAlert} />  
    </div>
  );
};

const mapStateToProps = state => ({
  emprestimos: state.emprestimoReducer.emprestimos,
  emprestimo: state.emprestimoReducer.emprestimo
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    findAll,
    insert,
    remove,
    update,
    detail
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EmprestimoList);