import { combineReducers } from 'redux';
import movies from './movies';
import search from './search';

const rootReducer = combineReducers({ moviesItems: movies, searchPanel: search });

export default rootReducer;