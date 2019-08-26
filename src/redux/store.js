import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import establishment from '../containers/establishment/reducers/reducers';

const appReducer = combineReducers({
	establishment,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
	appReducer,
	composeEnhancers(applyMiddleware(thunk)),
);
