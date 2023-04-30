import axios from 'axios'
import consts from '../consts'
import { openAlert } from './AlertReducer'

const http = axios.create({
    baseURL: `${consts.API_URL}`
})

const ACTIONS = {
    FINDALL: 'UF_FINDALL',
    INSERT: 'UF_INSERT',
    REMOVE: 'UF_REMOVE',
    UPDATE: 'UF_UPDATE',
    DETAIL: 'UF_DETAIL',
    CLEAR: 'UF_CLEAR'
}

const inicialState = {
    ufs: [],
    //uf: { id: 0, sigla: '', nome: '' }
    uf: { id: 0, sigla: '', nome: ''}
}

export const UFReducer = (state = inicialState, action) => {
    switch (action.type) {
        case ACTIONS.FINDALL:
            console.log("\n\nUFReducer::ACTIONS.FINDALL");
            return { ...state, ufs: action.ufs }
        case ACTIONS.INSERT:
            const lista = [...state.ufs, action.uf]
            return { ...state, ufs: lista }
        case ACTIONS.REMOVE:
            const id = action.id;
            const ufs = state.ufs.filter(uf => uf.id !== id)
            return { ...state, ufs: ufs }
        case ACTIONS.UPDATE:
            
            const listaAtualizada = [...state.ufs]
            listaAtualizada.forEach(u => {
                if (u.id === action.uf.id) {
                    u.id = action.uf.id;
                    u.sigla = action.uf.sigla;
                    u.nome = action.uf.nome;
                }
            })
            return { ...state, ufs: listaAtualizada }
        case ACTIONS.DETAIL:
            return { ...state, uf: { id: action.uf.id, sigla: action.uf.sigla, nome: action.uf.nome } }
        case ACTIONS.CLEAR:
            return { ...state, uf: { id: 0, sigla: '', nome: '' } }
        default:
            return state;
    }
}

export function findAll() {
    console.log("\n\nUFReducer::findAll");
    return dispatch => {
        http.get('/ufs').then(response => {
            console.log("response.data: " , response.data);
            dispatch({ type: ACTIONS.FINDALL, ufs: response.data })
        })
    }
}

export function insert(uf) {
    return dispatch => {
        http.post('/ufs', uf)
            .then(response => {
                dispatch([
                    { type: ACTIONS.INSERT, uf: response.data },
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

export function update(uf) {
    return dispatch => {
        http.put(`/ufs/${uf.id}`, uf)
            .then(response => {
                dispatch([
                    { type: ACTIONS.UPDATE, uf: response.data },
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
        http.delete(`/ufs/${id}`)
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

export function detail(uf) {
    return dispatch => {
        dispatch({ type: ACTIONS.DETAIL, uf: uf });
    }
}

export function clear() {
    return dispatch => {
        dispatch({ type: ACTIONS.CLEAR });
    }
}
