import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Alert } from '../../components/Alert';
import { findAll, insert, update, remove, detail } from '../../store/CidadeReducer'
import { CidadeToolbar, CidadeTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const CidadeList = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.findAll();
  }, [])

  return (
    <div className={classes.root}>
      <CidadeToolbar insert={props.insert} update={props.update} />
      <div className={classes.content}>
        <CidadeTable detail={props.detail} remove={props.remove} cidades={props.cidades} />
      </div>
      <Alert status={props.alert_status} mensagem={props.alert_description} closeDialog={props.closeAlert} />  
    </div>
  );
};

const mapStateToProps = state => ({
  cidades: state.cidadeReducer.cidades,
  cidade: state.cidadeReducer.cidade
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    findAll,
    insert,
    remove,
    update,
    detail
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CidadeList);