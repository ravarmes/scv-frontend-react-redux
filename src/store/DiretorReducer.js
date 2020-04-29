import axios from 'axios'
import consts from '../consts'
import { openAlert } from './AlertReducer'

const http = axios.create({
    baseURL: `${consts.API_URL}`
})

const ACTIONS = {
    FINDALL: 'DIRETOR_FINDALL',
    INSERT: 'DIRETOR_INSERT',
    REMOVE: 'DIRETOR_REMOVE',
    UPDATE: 'DIRETOR_UPDATE',
    DETAIL: 'DIRETOR_DETAIL',
    CLEAR: 'DIRETOR_CLEAR'
}

const inicialState = {
    diretores: [],
    diretor: { id: 0, nome: '', imagem: '' }
}

export const DiretorReducer = (state = inicialState, action) => {
    switch (action.type) {
        case ACTIONS.FINDALL:
            return { ...state, diretores: action.diretores }
        case ACTIONS.INSERT:
            const lista = [...state.diretores, action.diretor]
            return { ...state, diretores: lista }
        case ACTIONS.REMOVE:
            const id = action.id;
            const diretores = state.diretores.filter(diretor => diretor.id !== id)
            return { ...state, diretores: diretores }
        case ACTIONS.UPDATE:
            const listaAtualizada = [...state.diretores]
            listaAtualizada.forEach(d => {
                if (d.id === action.diretor.id) {
                    d.id = action.diretor.id;
                    d.nome = action.diretor.nome;
                }
            })
            return { ...state, diretores: listaAtualizada }
        case ACTIONS.DETAIL:
            return { ...state, diretor: { id: action.diretor.id, nome: action.diretor.nome } }
        case ACTIONS.CLEAR:
            return { ...state, diretor: { id: 0, nome: '' } }
        default:
            return state;
    }
}

export function findAll() {
    return dispatch => {
        http.get('/diretores').then(response => {
            dispatch({ type: ACTIONS.FINDALL, diretores: response.data })
        })
    }
}

export function insert(diretor) {
    return dispatch => {
        http.post('/diretores', diretor)
            .then(response => {
                dispatch([
                    { type: ACTIONS.INSERT, diretor: response.data },
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

export function update(diretor) {
    return dispatch => {
        http.put(`/diretores/${diretor.id}`, diretor)
            .then(response => {
                dispatch([
                    { type: ACTIONS.UPDATE, diretor: response.data },
                    { type: ACTIONS.CLEAR },
                    openAlert('Atualização com sucesso!'),
                ]);

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
        http.delete(`/diretores/${id}`)
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

export function detail(diretor) {
    return dispatch => {
        dispatch({ type: ACTIONS.DETAIL, diretor: diretor });
    }
}

export function clear() {
    return dispatch => {
        dispatch({ type: ACTIONS.CLEAR });
    }
}
