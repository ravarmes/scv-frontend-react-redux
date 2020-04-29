import axios from 'axios'
import consts from '../consts'
import { openAlert } from './AlertReducer'

const http = axios.create({
    baseURL: `${consts.API_URL}`
})

const ACTIONS = {
    FINDALL: 'TIPODEFILME_FINDALL',
    INSERT: 'TIPODEFILME_INSERT',
    REMOVE: 'TIPODEFILME_REMOVE',
    UPDATE: 'TIPODEFILME_UPDATE',
    DETAIL: 'TIPODEFILME_DETAIL',
    CLEAR: 'TIPODEFILME_CLEAR'
}

const inicialState = {
    tiposDeFilme: [],
    tipoDeFilme: { id: 0, nome: '', prazo: 0, preco: 0 }
}

export const TipoDeFilmeReducer = (state = inicialState, action) => {
    switch (action.type) {
        case ACTIONS.FINDALL:
            return { ...state, tiposDeFilme: action.tiposDeFilme }
        case ACTIONS.INSERT:
            const lista = [...state.tiposDeFilme, action.tipoDeFilme]
            return { ...state, tiposDeFilme: lista }
        case ACTIONS.REMOVE:
            const id = action.id;
            const tiposDeFilme = state.tiposDeFilme.filter(tipoDeFilme => tipoDeFilme.id !== id)
            return { ...state, tiposDeFilme: tiposDeFilme }
        case ACTIONS.UPDATE:
            const listaAtualizada = [...state.tiposDeFilme]
            listaAtualizada.forEach(t => {
                if (t.id === action.tipoDeFilme.id) {
                    t.id = action.tipoDeFilme.id;
                    t.nome = action.tipoDeFilme.nome;
                    t.prazo = action.tipoDeFilme.prazo;
                    t.preco = action.tipoDeFilme.preco;
                }
            })
            return { ...state, tiposDeFilme: listaAtualizada }
        case ACTIONS.DETAIL:
            return { ...state, tipoDeFilme: { id: action.tipoDeFilme.id, nome: action.tipoDeFilme.nome, prazo: action.tipoDeFilme.prazo, preco: action.tipoDeFilme.preco } }
        case ACTIONS.CLEAR:
            return { ...state, tipoDeFilme: { id: 0, nome: '', prazo: 0, preco: 0 } }
        default:
            return state;
    }
}

export function findAll() {
    return dispatch => {
        http.get('/tiposdefilme').then(response => {
            dispatch({ type: ACTIONS.FINDALL, tiposDeFilme: response.data })
        })
    }
}

export function insert(tipoDeFilme) {
    return dispatch => {
        http.post('/tiposdefilme', tipoDeFilme)
            .then(response => {
                dispatch([
                    { type: ACTIONS.INSERT, tipoDeFilme: response.data },
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

export function update(tipoDeFilme) {
    return dispatch => {
        http.put(`/tiposdefilme/${tipoDeFilme.id}`, tipoDeFilme)
            .then(response => {
                dispatch([
                    { type: ACTIONS.UPDATE, tipoDeFilme: response.data },
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
        http.delete(`/tiposdefilme/${id}`)
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

export function detail(tipoDeFilme) {
    return dispatch => {
        dispatch({ type: ACTIONS.DETAIL, tipoDeFilme: tipoDeFilme });
    }
}

export function clear() {
    return dispatch => {
        dispatch({ type: ACTIONS.CLEAR });
    }
}
