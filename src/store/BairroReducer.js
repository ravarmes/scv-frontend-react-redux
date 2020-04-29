import axios from 'axios'
import consts from '../consts'
import { openAlert } from './AlertReducer'

const http = axios.create({
    baseURL: `${consts.API_URL}`
})

const ACTIONS = {
    FINDALL: 'BAIRRO_FINDALL',
    INSERT: 'BAIRRO_INSERT',
    REMOVE: 'BAIRRO_REMOVE',
    UPDATE: 'BAIRRO_UPDATE',
    DETAIL: 'BAIRRO_DETAIL',
    CLEAR: 'BAIRRO_CLEAR'
}

const inicialState = {
    bairros: [],
    bairro: { id: 0, nome: '', cidade: {id: 0, nome: '', uf: { id: 0, sigla: '', nome: '' } } }
}

export const BairroReducer = (state = inicialState, action) => {
    switch (action.type) {
        case ACTIONS.FINDALL:
            return { ...state, bairros: action.bairros }
        case ACTIONS.INSERT:
            const lista = [...state.bairros, action.bairro]
            return { ...state, bairros: lista }
        case ACTIONS.REMOVE:
            const id = action.id;
            const bairros = state.bairros.filter(bairro => bairro.id !== id)
            return { ...state, bairros: bairros }
        case ACTIONS.UPDATE:
            const listaAtualizada = [...state.bairros]
            listaAtualizada.forEach(b => {
                if (b.id === action.bairro.id) {
                    b.id = action.bairro.id;
                    b.nome = action.bairro.nome;
                    b.cidade = action.bairro.cidade;
                }
            })
            return { ...state, bairros: listaAtualizada }
        case ACTIONS.DETAIL:
            return { ...state, bairro: { id: action.bairro.id, nome: action.bairro.nome, cidade: action.bairro.cidade } }
        case ACTIONS.CLEAR:
            return { ...state, bairro: { id: 0, nome: '', cidade: {id: 0, nome: '', uf: { id: 0, sigla: '', nome: '' } } } }
        default:
            return state;
    }
}

export function findAll() {
    return dispatch => {
        http.get('/bairros').then(response => {
            dispatch({ type: ACTIONS.FINDALL, bairros: response.data })
        })
    }
}

export function insert(bairro) {
    if (bairro.cidade.id === 0) bairro.cidade = null; 
    return dispatch => {
        http.post('/bairros', bairro)
            .then(response => {
                dispatch([
                    { type: ACTIONS.INSERT, bairro: response.data },
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

export function update(bairro) {
    return dispatch => {
        http.put(`/bairros/${bairro.id}`, bairro)
            .then(response => {
                dispatch([
                    { type: ACTIONS.UPDATE, bairro: response.data },
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
        http.delete(`/bairros/${id}`)
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

export function detail(bairro) {
    return dispatch => {
        dispatch({ type: ACTIONS.DETAIL, bairro: bairro });
    }
}

export function clear() {
    return dispatch => {
        dispatch({ type: ACTIONS.CLEAR });
    }
}