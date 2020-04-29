import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';

//[Início] Configurações iniciais do Redux
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import multi from 'redux-multi'
import mainReducer from './store'

//devTools é a configuração para uma extensão no Google Chrome (depuração de código no redux)
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ 
      && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(thunk, multi)(createStore)(mainReducer, devTools)


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

//[Término] Configurações iniciais do Redux


serviceWorker.unregister();
