import axios from 'axios'
import consts from '../consts'
import { openAlert } from './AlertReducer'

const http = axios.create({
    baseURL: `${consts.API_URL}`
})

const ACTIONS = {
    FINDALL: 'ARTISTA_FINDALL',
    INSERT: 'ARTISTA_INSERT',
    REMOVE: 'ARTISTA_REMOVE',
    UPDATE: 'ARTISTA_UPDATE',
    DETAIL: 'ARTISTA_DETAIL',
    CLEAR: 'ARTISTA_CLEAR'
}

const inicialState = {
    artistas: [],
    artista: { id: 0, nome: '', imagem: '' }
}

export const ArtistaReducer = (state = inicialState, action) => {
    switch (action.type) {
        case ACTIONS.FINDALL:
            return { ...state, artistas: action.artistas }
        case ACTIONS.INSERT:
            const lista = [...state.artistas, action.artista]
            return { ...state, artistas: lista }
        case ACTIONS.REMOVE:
            const id = action.id;
            const artistas = state.artistas.filter(artista => artista.id !== id)
            return { ...state, artistas: artistas }
        case ACTIONS.UPDATE:
            const listaAtualizada = [...state.artistas]
            listaAtualizada.forEach(a => {
                if (a.id === action.artista.id) {
                    a.id = action.artista.id;
                    a.nome = action.artista.nome;
                    a.imagem = action.artista.imagem;
                }
            })
            return { ...state, artistas: listaAtualizada }
        case ACTIONS.DETAIL:
            return { ...state, artista: { id: action.artista.id, nome: action.artista.nome, imagem: action.artista.imagem } }
        case ACTIONS.CLEAR:
            return { ...state, artista: { id: 0, nome: '', imagem: '' } }
        default:
            return state;
    }
}

export function findAll() {
    return dispatch => {
        http.get('/artistas').then(response => {
            dispatch({ type: ACTIONS.FINDALL, artistas: response.data })
        })
    }
}

export function insert(artista) {
    return dispatch => {
        http.post('/artistas', artista)
            .then(response => {
                dispatch([
                    { type: ACTIONS.INSERT, artista: response.data },
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

export function update(artista) {
    return dispatch => {
        http.put(`/artistas/${artista.id}`, artista)
            .then(response => {
                dispatch([
                    { type: ACTIONS.UPDATE, artista: response.data },
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
        http.delete(`/artistas/${id}`)
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

export function detail(artista) {
    return dispatch => {
        dispatch({ type: ACTIONS.DETAIL, artista: artista });
    }
}

export function clear() {
    return dispatch => {
        dispatch({ type: ACTIONS.CLEAR });
    }
}
