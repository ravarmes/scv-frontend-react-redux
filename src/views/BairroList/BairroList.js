import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Alert } from '../../components/Alert';
import { findAll, insert, update, remove, detail } from '../../store/BairroReducer'
import { BairroToolbar, BairroTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const BairroList = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.findAll();
  }, [])

  return (
    <div className={classes.root}>
      <BairroToolbar insert={props.insert} update={props.update} />
      <div className={classes.content}>
        <BairroTable detail={props.detail} remove={props.remove} bairros={props.bairros} />
      </div>
      <Alert status={props.alert_status} mensagem={props.alert_description} closeDialog={props.closeAlert} />  
    </div>
  );
};

const mapStateToProps = state => ({
  bairros: state.bairroReducer.bairros,
  bairro: state.bairroReducer.bairro
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    findAll,
    insert,
    remove,
    update,
    detail
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BairroList);