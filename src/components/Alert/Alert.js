import React from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { closeAlert } from '../../store/AlertReducer'

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@material-ui/core'

const Alert = props => {
    const { className, onChange, style, ...rest } = props;

    return (
        <div>
            <Dialog open={props.alert_status} onClose={props.closeAlert}>
                <DialogTitle>Atenção</DialogTitle>
                <DialogContent>{props.alert_description}</DialogContent>
                <DialogActions><Button onClick={props.closeAlert}>Fechar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const mapStateToProps = state => ({
    alert_description: state.alertReducer.alert_description,
    alert_status: state.alertReducer.alert_status
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        closeAlert
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Alert);