import axios from 'axios'
import consts from '../consts'
import { openAlert } from './AlertReducer'

const http = axios.create({
    baseURL: `${consts.API_URL}`
})

const ACTIONS = {
    FINDALL: 'FILME_FINDALL',
    INSERT: 'FILME_INSERT',
    REMOVE: 'FILME_REMOVE',
    UPDATE: 'FILME_UPDATE',
    DETAIL: 'FILME_DETAIL',
    CLEAR: 'FILME_CLEAR'
}

const inicialState = {
    filmes: [],
    filme: { id: 0, titulo: '', genero: '', duracao: '', tipoDeFilme: null, imagem: '', diretores: [], participacoes: [] }
}

export const FilmeReducer = (state = inicialState, action) => {
    switch (action.type) {
        case ACTIONS.FINDALL:
            return { ...state, filmes: action.filmes }
        case ACTIONS.INSERT:
            const lista = [...state.filmes, action.filme]
            return { ...state, filmes: lista }
        case ACTIONS.REMOVE:
            const id = action.id;
            const filmes = state.filmes.filter(filme => filme.id !== id)
            return { ...state, filmes: filmes }
        case ACTIONS.UPDATE:
            const listaAtualizada = [...state.filmes]
            listaAtualizada.forEach(f => {
                if (f.id === action.filme.id) {
                    f.id = action.filme.id;
                    f.titulo = action.filme.titulo;
                    f.genero = action.filme.genero;
                    f.duracao = action.filme.duracao;
                    f.tipoDeFilme = action.filme.tipoDeFilme;
                    f.imagem = action.filme.imagem;
                    f.diretores = action.filme.diretores;
                    f.participacoes = action.filme.participacoes;
                }
            })
            return { ...state, filmes: listaAtualizada }
        case ACTIONS.DETAIL:
            return {
                ...state,
                filme: {
                    id: action.filme.id,
                    titulo: action.filme.titulo,
                    genero: action.filme.genero, 
                    duracao: action.filme.duracao, 
                    tipoDeFilme: action.filme.tipoDeFilme, 
                    imagem: action.filme.imagem,
                    diretores: action.filme.diretores,
                    participacoes: action.filme.participacoes
                }
            }
        case ACTIONS.CLEAR:
            return { 
                ...state, 
                filme: { 
                    id: 0, titulo: '', 
                    genero: '', 
                    duracao: '', 
                    tipoDeFilme: null, 
                    imagem: '',
                    diretores: [],
                    participacoes: []
                } 
            }
        default:
            return state;
    }
}

export function findAll() {
    return dispatch => {
        http.get('/filmes').then(response => {
            dispatch({ type: ACTIONS.FINDALL, filmes: response.data })
        })
    }
}

export function insert(filme) {
    return dispatch => {
        http.post('/filmes', filme)
            .then(response => {
                dispatch([
                    { type: ACTIONS.INSERT, filme: response.data },
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

export function update(filme) {
    return dispatch => {
        http.put(`/filmes/${filme.id}`, filme)
            .then(response => {
                dispatch([
                    { type: ACTIONS.UPDATE, filme: response.data },
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
        http.delete(`/filmes/${id}`)
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

export function detail(filme) {
    return dispatch => {
        dispatch({ type: ACTIONS.DETAIL, filme: filme });
    }
}

export function clear() {
    return dispatch => {
        dispatch({ type: ACTIONS.CLEAR });
    }
}
