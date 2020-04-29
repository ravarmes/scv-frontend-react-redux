import axios from 'axios'
import consts from '../consts'
import { openAlert } from './AlertReducer'

const http = axios.create({
    baseURL: `${consts.API_URL}`
})

const ACTIONS = {
    FINDALL: 'CLIENTE_FINDALL',
    INSERT: 'CLIENTE_INSERT',
    REMOVE: 'CLIENTE_REMOVE',
    UPDATE: 'CLIENTE_UPDATE',
    DETAIL: 'CLIENTE_DETAIL',
    CLEAR: 'CLIENTE_CLEAR'
}

const inicialState = {
    clientes: [],
    cliente: { id: 0, nome: '', cpf: '', rua: '', numero: 0, debito: 0, nascimento: '', bairro: {id: 0, nome: ''} }
}

export const ClienteReducer = (state = inicialState, action) => {
    switch (action.type) {
        case ACTIONS.FINDALL:
            return { ...state, clientes: action.clientes }
        case ACTIONS.INSERT:
            const lista = [...state.clientes, action.cliente]
            return { ...state, clientes: lista }
        case ACTIONS.REMOVE:
            const id = action.id;
            const clientes = state.clientes.filter(cliente => cliente.id !== id)
            return { ...state, clientes: clientes }
        case ACTIONS.UPDATE:
            const listaAtualizada = [...state.clientes]
            listaAtualizada.forEach(c => {
                if (c.id === action.cliente.id) {
                    c.id = action.cliente.id;
                    c.nome = action.cliente.nome;
                    c.cpf = action.cliente.cpf;
                    c.rua = action.cliente.rua;
                    c.numero = action.cliente.numero;
                    c.debito = action.cliente.debito;
                    c.nascimento = action.cliente.nascimento;
                    c.bairro = action.cliente.bairro;
                }
            })
            return { ...state, clientes: listaAtualizada }
        case ACTIONS.DETAIL:
            return { ...state, cliente: { id: action.cliente.id, nome: action.cliente.nome, cpf: action.cliente.cpf, rua: action.cliente.rua, numero: action.cliente.numero, debito: action.cliente.debito, nascimento: action.cliente.nascimento, bairro: action.cliente.bairro } }
        case ACTIONS.CLEAR:
            return { ...state, cliente: { id: 0, nome: '', cpf: '', rua: '', numero: 0, debito: 0, nascimento: '', bairro: {id: 0, nome: ''} } }
        default:
            return state;
    }
}

export function findAll() {
    return dispatch => {
        http.get('/clientes').then(response => {
            dispatch({ type: ACTIONS.FINDALL, clientes: response.data })
        })
    }
}

export function insert(cliente) {
    return dispatch => {
        http.post('/clientes', cliente)
            .then(response => {
                dispatch([
                    { type: ACTIONS.INSERT, cliente: response.data },
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

export function update(cliente) {
    return dispatch => {
        http.post(`/clientes/${cliente.id}`, cliente)
            .then(response => {
                dispatch([
                    { type: ACTIONS.UPDATE, cliente: response.data },
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
        http.delete(`/clientes/${id}`)
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

export function detail(cliente) {
    return dispatch => {
        dispatch({ type: ACTIONS.DETAIL, cliente: cliente });
    }
}

export function clear() {
    return dispatch => {
        dispatch({ type: ACTIONS.CLEAR });
    }
}
