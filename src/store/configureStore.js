import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from './promiseMiddleware';
import asyncActionCallbackMiddleware from './asyncActionCallbackMiddleware';
import utilsMiddleware from './utilsMiddleware';
import syncReducerToAsyncStorage from './syncReducerToAsyncStorage';
import updateMiddleware from './update';
import logger from 'redux-logger';
import reducers from '../reducers';


var middlewares = [
    thunkMiddleware,
    promiseMiddleware,
    asyncActionCallbackMiddleware,
    utilsMiddleware,
    updateMiddleware,
    syncReducerToAsyncStorage
];


if (__DEV__) {
    middlewares.push(logger());
}


export default function configureStore(initialState) {
    return applyMiddleware(
        ...middlewares
    )(createStore)(reducers, initialState);
}






