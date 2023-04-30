import axios from 'axios'
import consts from '../consts'
import { openAlert } from './AlertReducer'

const http = axios.create({
    baseURL: `${consts.API_URL}`
})

const ACTIONS = {
    FINDALL: 'CIDADE_FINDALL',
    FINDBYUF: 'CIDADE_FINBYUF',
    INSERT: 'CIDADE_INSERT',
    REMOVE: 'CIDADE_REMOVE',
    UPDATE: 'CIDADE_UPDATE',
    DETAIL: 'CIDADE_DETAIL',
    CLEAR: 'CIDADE_CLEAR'
}

const inicialState = {
    cidades: [],
    cidade: { id: 0, nome: '', uf: { id: 0, sigla: '', nome: '' } }
}

export const CidadeReducer = (state = inicialState, action) => {
    switch (action.type) {
        case ACTIONS.FINDALL:
            return { ...state, cidades: action.cidades }
        case ACTIONS.FINDBYUF:
            return { ...state, cidades: action.cidades }
        case ACTIONS.INSERT:
            const lista = [...state.cidades, action.cidade]
            return { ...state, cidades: lista }

            //const lista = [...state.cidades, action.cidade]
            //return { ...state, cidades: lista }
        case ACTIONS.REMOVE:
            const id = action.id;
            const cidades = state.cidades.filter(cidade => cidade.id !== id)
            return { ...state, cidades: cidades }
        case ACTIONS.UPDATE:
            const listaAtualizada = [...state.cidades]
            listaAtualizada.forEach(c => {
                if (c.id === action.cidade.id) {
                    c.id = action.cidade.id;
                    c.nome = action.cidade.nome;
                    c.uf = action.cidade.uf;
                }
            })
            return { ...state, cidades: listaAtualizada }
        case ACTIONS.DETAIL:
            return { ...state, cidade: { id: action.cidade.id, nome: action.cidade.nome, uf: action.cidade.uf } }
        case ACTIONS.CLEAR:
            return { ...state, cidade: { id: 0, nome: '', uf: { id: 0, sigla: '', nome: '' } } }
        default:
            return state;
    }
}

export function findAll() {
    return dispatch => {
        http.get('/cidades').then(response => {
            dispatch({ type: ACTIONS.FINDALL, cidades: response.data })
        })
    }
}

export function findByUf(uf) {
    return dispatch => {
        http.get(`/cidades/findByUf/${uf.id}`).then(response => {
            dispatch({ type: ACTIONS.FINDBYUF, cidades: response.data })
        })
    }
}

export function insert(cidade) {
    return dispatch => {
        http.post('/cidades', cidade)
            .then(response => {
                dispatch([
                    { type: ACTIONS.INSERT, cidade: response.data },
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

export function update(cidade) {
    return dispatch => {
        http.put(`/cidades/${cidade.id}`, cidade)
            .then(response => {
                dispatch([
                    { type: ACTIONS.UPDATE, cidade: response.data },
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
        http.delete(`/cidades/${id}`)
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

export function detail(cidade) {
    return dispatch => {
        dispatch({ type: ACTIONS.DETAIL, cidade: cidade });
    }
}

export function clear() {
    return dispatch => {
        dispatch({ type: ACTIONS.CLEAR });
    }
}