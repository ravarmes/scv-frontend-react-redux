import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Alert } from '../../components/Alert';
import { findAll, insert, update, remove, detail } from '../../store/FilmeReducer'
import { FilmeToolbar, FilmeTable, ItemDiretorTable, ItemParticipacaoTable } from './components';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const FilmeList = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.findAll();
  }, [])

  return (
    <div className={classes.root}>
      <FilmeToolbar insert={props.insert} update={props.update} />
      <div className={classes.content}>
        <Grid container>
          <Grid item md="4">
            <ItemDiretorTable detail={props.detail} emprestimo={props.filme} />
          </Grid>
          <Grid item md="8">
            <ItemParticipacaoTable detail={props.detail} emprestimo={props.filme} />
          </Grid>
        </Grid>
      </div>
      <div className={classes.content}>
        <FilmeTable detail={props.detail} remove={props.remove} filmes={props.filmes} />
      </div>
      <Alert status={props.alert_status} mensagem={props.alert_description} closeDialog={props.closeAlert} />  
    </div>
  );
};

const mapStateToProps = state => ({
  filmes: state.filmeReducer.filmes,
  filme: state.filmeReducer.filme
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    findAll,
    insert,
    remove,
    update,
    detail
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FilmeList);