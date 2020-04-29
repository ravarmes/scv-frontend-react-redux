const initialState = {
    alert_description: '',
    alert_status: false
}

export const ACTIONS = {
    OPEN: 'ALERT_OPEN',
    CLOSE: 'ALERT_CLOSE'
}

export function AlertReducer(state = initialState, action){
    switch(action.type){
        case ACTIONS.OPEN:
            return {...state, alert_description: action.alert_description, alert_status: true}
        case ACTIONS.CLOSE:
            return {...state, alert_description: '', alert_status: false}
        default:
            return state;
    }
}

export function openAlert(alert_description){
    return {
        type: ACTIONS.OPEN,
        alert_description: alert_description
    }
}

export function closeAlert(){
    return {
        type: ACTIONS.CLOSE
    }
}