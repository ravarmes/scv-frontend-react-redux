import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { findAll, insert, update, remove, detail } from '../../store/ArtistaReducer'
import { Alert } from '../../components/Alert';
import { ArtistaToolbar, ArtistaTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const ArtistaList = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.findAll();
  }, [])

  return (
    <div className={classes.root}>
      <ArtistaToolbar insert={props.insert} update={props.update} />
      <div className={classes.content}>
        <ArtistaTable detail={props.detail} remove={props.remove} artistas={props.artistas} />
      </div>
      <Alert status={props.alert_status} mensagem={props.alert_description} closeDialog={props.closeAlert} />  
    </div>
  );
};

const mapStateToProps = state => ({
  artistas: state.artistaReducer.artistas,
  artista: state.artistaReducer.artista
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    findAll,
    insert,
    remove,
    update,
    detail
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ArtistaList);