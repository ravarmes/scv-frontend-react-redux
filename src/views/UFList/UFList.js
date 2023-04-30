import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Alert } from '../../components/Alert';
import { findAll, insert, update, remove, detail } from '../../store/UFReducer'
import { UFToolbar, UFTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UFList = (props) => {
  const classes = useStyles();

  useEffect(() => {
    console.log("UFList::useEffect::props.findAll();");
    props.findAll();
  }, [])

  return (
    <div className={classes.root}>
      <UFToolbar insert={props.insert} update={props.update} />
      <div className={classes.content}>
        <UFTable detail={props.detail} remove={props.remove} ufs={props.ufs} />
      </div>
      <Alert status={props.alert_status} mensagem={props.alert_description} closeDialog={props.closeAlert} />  
    </div> 
  );
};

const mapStateToProps = state => ({
  ufs: state.ufReducer.ufs,
  uf: state.ufReducer.uf
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    findAll,
    insert,
    remove,
    update,
    detail
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UFList);