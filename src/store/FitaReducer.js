import axios from 'axios'
import consts from '../consts'
import { openAlert } from './AlertReducer'

const http = axios.create({
    baseURL: `${consts.API_URL}`
})

const ACTIONS = {
    FINDALL: 'FITA_FINDALL',
    FINDBYFILME: 'FITA_FINDBYFILME',
    INSERT: 'FITA_INSERT',
    REMOVE: 'FITA_REMOVE',
    UPDATE: 'FITA_UPDATE',
    DETAIL: 'FITA_DETAIL',
    CLEAR: 'FITA_CLEAR'
}

const inicialState = {
    fitas: [],
    fita: { id: 0, danificada: false, disponivel: true, filme: { id: 0, titulo: '', genero: '', duracao: '', tipoDeFilme: { id: 0, nome: '', prazo: 0, preco: 0 } } }
}

export const FitaReducer = (state = inicialState, action) => {
    switch (action.type) {
        case ACTIONS.FINDALL:
            return { ...state, fitas: action.fitas }
        case ACTIONS.FINDBYFILME:
            return { ...state, fitas: action.fitas }
        case ACTIONS.INSERT:
            const lista = [...state.fitas, action.fita]
            return { ...state, fitas: lista }
        case ACTIONS.REMOVE:
            const id = action.id;
            const fitas = state.fitas.filter(fita => fita.id !== id)
            return { ...state, fitas: fitas }
        case ACTIONS.UPDATE:
            const listaAtualizada = [...state.fitas]
            listaAtualizada.forEach(f => {
                if (f.id === action.fita.id) {
                    f.id = action.fita.id;
                    f.danificada = action.fita.danificada;
                    f.disponivel = action.fita.disponivel;
                    f.filme = action.fita.filme;
                }
            })
            return { ...state, fitas: listaAtualizada }
        case ACTIONS.DETAIL:
            return { ...state, fita: { id: action.fita.id, danificada: action.fita.danificada, disponivel: action.fita.disponivel, filme: action.fita.filme } }
        case ACTIONS.CLEAR:
            return { ...state, fita: { id: 0, danificada: false, disponivel: true, filme: { id: 0, titulo: '', genero: '', duracao: '', tipoDeFilme: { id: 0, nome: '', prazo: 0, preco: 0 } } } }
        default:
            return state;
    }
}

export function findAll() {
    return dispatch => {
        http.get('/fitas').then(response => {
            dispatch({ type: ACTIONS.FINDALL, fitas: response.data })
        })
    }
}

export function findByFilme(filme) {
    return dispatch => {
        http.get(`/fitas/findByFilme/${filme.id}`).then(response => {
            dispatch({ type: ACTIONS.FINDBYFILME, fitas: response.data })
        })
    }
}

export function insert(fita) {
    return dispatch => {
        http.post('/fitas', fita)
            .then(response => {
                dispatch([
                    { type: ACTIONS.INSERT, fita: response.data },
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

export function update(fita) {
    return dispatch => {
        http.put(`/fitas/${fita.id}`, fita)
            .then(response => {
                dispatch([
                    { type: ACTIONS.UPDATE, fita: response.data },
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
        http.delete(`/fitas/${id}`)
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

export function detail(fita) {
    return dispatch => {
        dispatch({ type: ACTIONS.DETAIL, fita: fita });
    }
}

export function clear() {
    return dispatch => {
        dispatch({ type: ACTIONS.CLEAR });
    }
}
