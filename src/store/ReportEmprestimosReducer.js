import axios from 'axios'
import consts from '../consts'
import { openAlert } from './AlertReducer'

const http = axios.create({
    baseURL: `${consts.API_URL}`
})

const ACTIONS = {
    FINDTOTAISCLIENTES: 'REPORT_EMPRESTIMO_CLIENTES',
    FINDTOTAISBAIRROS: 'REPORT_EMPRESTIMO_BAIRROS',
    FINDTOTAISFILMES: 'REPORT_EMPRESTIMO_FILMES',
    DETAIL: 'REPORT_EMPRESTIMO_DETAIL',
    CLEAR: 'REPORT_EMPRESTIMO_CLEAR'
}

const inicialState = {
    report_rows: [],
    filtro: {di: '',  df:''}
}

export const ReportEmprestimosReducer = (state = inicialState, action) => {
    switch (action.type) {
        case ACTIONS.FINDTOTAISCLIENTES:
            return { ...state, report_rows: action.report_rows }
        case ACTIONS.FINDTOTAISBAIRROS:
            return { ...state, report_rows: action.report_rows }
        case ACTIONS.FINDTOTAISFILMES:
            return { ...state, report_rows: action.report_rows }
        case ACTIONS.DETAIL:
            return { ...state, filtro: { di: action.filtro.di, df: action.filtro.df} }
        case ACTIONS.CLEAR:
            return { ...state, filtro: {di: '',  df:''}, report_rows: [] }
        default:
            return state;
    }
}

export function findTotaisAndQuantidadesEmprestimosOfClientesByPeriodo(filtro) {
    return dispatch => {
        http.get(`/emprestimos/findTotaisAndQuantidadesEmprestimosOfClientesByPeriodo/${filtro.di}/${filtro.df}`).then(response => {
            dispatch({ type: ACTIONS.FINDTOTAISCLIENTES, report_rows: response.data })
        })
    }
}

export function findQuantidadesEmprestimosOfBairrosByPeriodo(filtro) {
    return dispatch => {
        http.get(`/emprestimos/findQuantidadesEmprestimosOfBairrosByPeriodo/${filtro.di}/${filtro.df}`).then(response => {
            dispatch({ type: ACTIONS.FINDTOTAISBAIRROS, report_rows: response.data })
        })
    }
}

export function findQuantidadesEmprestimosOfFilmesByPeriodo(filtro) {
    return dispatch => {
        http.get(`/emprestimos/findQuantidadesEmprestimosOfFilmesByPeriodo/${filtro.di}/${filtro.df}`).then(response => {
            dispatch({ type: ACTIONS.FINDTOTAISFILMES, report_rows: response.data })
        })
    }
}

export function detail(filtro) {
    return dispatch => {
        dispatch({ type: ACTIONS.DETAIL, filtro: filtro });
    }
}

export function clear() {
    return dispatch => {
        dispatch({ type: ACTIONS.CLEAR });
    }
}
