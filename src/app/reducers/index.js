import { combineReducers } from 'redux';
import movies from './movies';

const rootReducer = combineReducers({ moviesItems: movies });

export default rootReducer;