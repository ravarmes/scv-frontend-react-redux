import axios from 'axios'
import consts from '../consts'
import { openAlert } from './AlertReducer'

const http = axios.create({
    baseURL: `${consts.API_URL}`
})

const ACTIONS = {
    FINDALL: 'EMPRESTIMO_FINDALL',
    FINDBYUF: 'EMPRESTIMO_FINBYUF',
    INSERT: 'EMPRESTIMO_INSERT',
    REMOVE: 'EMPRESTIMO_REMOVE',
    UPDATE: 'EMPRESTIMO_UPDATE',
    DETAIL: 'EMPRESTIMO_DETAIL',
    CLEAR: 'EMPRESTIMO_CLEAR'
}

const inicialState = {
    emprestimos: [],
    emprestimo: { id: 0, data: '', valor: 0, cliente: { id: 0, nome: '' }, itens: [] }
}

export const EmprestimoReducer = (state = inicialState, action) => {
    switch (action.type) {
        case ACTIONS.FINDALL:
            return { ...state, emprestimos: action.emprestimos }
        case ACTIONS.FINDBYUF:
            return { ...state, emprestimos: action.emprestimos }
        case ACTIONS.INSERT:
            const lista = [...state.emprestimos, action.emprestimo]
            return { ...state, emprestimos: lista }
        case ACTIONS.REMOVE:
            const id = action.id;
            const emprestimos = state.emprestimos.filter(emprestimo => emprestimo.id !== id)
            return { ...state, emprestimos: emprestimos }
        case ACTIONS.UPDATE:
            const listaAtualizada = [...state.emprestimos]
            listaAtualizada.forEach(e => {
                if (e.id === action.emprestimo.id) {
                    e.id = action.emprestimo.id;
                    e.data = action.emprestimo.data;
                    e.valor = action.emprestimo.valor;
                    e.cliente = action.emprestimo.cliente;
                    e.itens = action.emprestimo.itens;
                }
            })
            return { ...state, emprestimos: listaAtualizada }
        case ACTIONS.DETAIL:
            return { ...state, emprestimo: { id: action.emprestimo.id, data: action.emprestimo.data, valor: action.emprestimo.valor, cliente: action.emprestimo.cliente, itens:  action.emprestimo.itens} }
        case ACTIONS.CLEAR:
            return { ...state, emprestimo: { id: 0, data: '', valor: 0, cliente: { id: 0, nome: '' }, itens: [] } }
            //return { ...state, emprestimo: { id: 0, valor: 0, cliente: { id: 0, nome: '' }, itens: [] } }
        default:
            return state;
    }
}

export function findAll() {
    return dispatch => {
        http.get('/emprestimos').then(response => {
            dispatch({ type: ACTIONS.FINDALL, emprestimos: response.data })
        })
    }
}

export function findByUf(uf) {
    return dispatch => {
        http.get(`/emprestimos/findByUf/${uf.id}`).then(response => {
            dispatch({ type: ACTIONS.FINDBYUF, emprestimos: response.data })
        })
    }
}

export function insert(emprestimo) {
    return dispatch => {
        http.post('/emprestimos', emprestimo)
            .then(response => {
                dispatch([
                    { type: ACTIONS.INSERT, emprestimo: response.data },
                    { type: ACTIONS.CLEAR },
                    openAlert('Inserção com sucesso!')
                ])
            })
            .catch(error => {
                const stringError = error.response.data;
                dispatch([
                    openAlert(stringError['message'])
                ])
            })
    }
}

export function update(emprestimo) {
    return dispatch => {
        http.put(`/emprestimos/${emprestimo.id}`, emprestimo)
            .then(response => {
                dispatch([
                    { type: ACTIONS.UPDATE, emprestimo: response.data },
                    { type: ACTIONS.CLEAR },
                    openAlert('Atualização com sucesso!')
                ])
            })
            .catch(error => {
                const stringError = error.response.data;
                dispatch([
                    openAlert(stringError['message'])
                ])
            })
    }
}

export function remove(id) {
    return dispatch => {
        http.delete(`/emprestimos/${id}`)
            .then(response => {
                dispatch([
                    { type: ACTIONS.REMOVE, id: id },
                    { type: ACTIONS.CLEAR },
                    openAlert('Remoção com sucesso!')
                ])
            })
            .catch(error => {
                const stringError = error.response.data;
                dispatch([
                    openAlert(stringError['message'])
                ])
            })
    }
}

export function detail(emprestimo) {
    return dispatch => {
        dispatch({ type: ACTIONS.DETAIL, emprestimo: emprestimo });
    }
}

export function clear() {
    return dispatch => {
        dispatch({ type: ACTIONS.CLEAR });
    }
}