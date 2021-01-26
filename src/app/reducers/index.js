import { combineReducers } from 'redux';
import movies from './movies';
import movie from './movie';
import search from './search';
import favorites from './favorites';

const rootReducer = combineReducers({ moviesItems: movies, movie, search, favorites });

export default rootReducer;