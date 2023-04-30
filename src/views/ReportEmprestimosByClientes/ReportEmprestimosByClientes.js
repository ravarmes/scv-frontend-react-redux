import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Alert } from '../../components/Alert';
import { findTotaisAndQuantidadesEmprestimosOfClientesByPeriodo, clear } from '../../store/ReportEmprestimosReducer'
import { ReportEmprestimosByClientesTable } from './components';
import { ReportEmprestimosByClientesToolbar } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const ReportEmprestimosByClientes = (props) => {
  const classes = useStyles();

  useEffect(() => {
    
  }, [])

  return (
    <div className={classes.root}>
      <ReportEmprestimosByClientesToolbar findTotaisAndQuantidadesEmprestimosOfClientesByPeriodo={props.findTotaisAndQuantidadesEmprestimosOfClientesByPeriodo} />
      <div className={classes.content}>
        <ReportEmprestimosByClientesTable report_rows={props.report_rows} />
      </div>
      <Alert status={props.alert_status} mensagem={props.alert_description} closeDialog={props.closeAlert} />  
    </div> 
  );
};

const mapStateToProps = state => ({
  report_rows: state.reportEmprestimosReducer.report_rows
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    findTotaisAndQuantidadesEmprestimosOfClientesByPeriodo,
    clear
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ReportEmprestimosByClientes);