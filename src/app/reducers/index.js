import { combineReducers } from 'redux';
import movies from './movies';
import movie from './movie';
import search from './search';
import genres from './genres';

const rootReducer = combineReducers({ moviesItems: movies, movie, search, genres });

export default rootReducer;