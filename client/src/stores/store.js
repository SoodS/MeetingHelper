import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState) {

    let store =createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );

    return store;
}