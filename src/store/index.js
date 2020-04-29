import { combineReducers } from 'redux'

import { AlertReducer } from './AlertReducer'
import { ArtistaReducer } from './ArtistaReducer'
import { BairroReducer } from './BairroReducer'
import { CidadeReducer } from './CidadeReducer'
import { ClienteReducer } from './ClienteReducer'
import { DiretorReducer } from './DiretorReducer'
import { EmprestimoReducer } from './EmprestimoReducer'
import { FilmeReducer } from './FilmeReducer'
import { FitaReducer } from './FitaReducer'
import { TipoDeFilmeReducer } from './TipoDeFilmeReducer'
import { UFReducer } from './UFReducer'

const mainReducer = combineReducers({
    alertReducer: AlertReducer,
    artistaReducer: ArtistaReducer,
    bairroReducer: BairroReducer,
    cidadeReducer: CidadeReducer,
    clienteReducer: ClienteReducer,
    diretorReducer: DiretorReducer,
    emprestimoReducer: EmprestimoReducer,
    filmeReducer: FilmeReducer,
    fitaReducer: FitaReducer,
    tipoDeFilmeReducer: TipoDeFilmeReducer,
    ufReducer: UFReducer
})

export default mainReducer;