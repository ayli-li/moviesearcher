import {
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_ERROR,
  FETCH_MOVIES_LOADING,
  SET_FAVORITES_ID,
  SET_MOVIES_PAGE
} from '../../constants';

import { load } from 'redux-localstorage-simple';

const savedFavorites = load({ namespace: 'movies'});

const initialState = {
  movies: [],
  errorMessage: '',
  isLoading: false,
  page: 1,
  favorites: savedFavorites.length > 0 ? savedFavorites : []
}

const movies = (state = initialState, {
  type,
  movies,
  err,
  loader,
  id
}) => {
  switch (type) {
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state, movies: state.movies.concat(movies)
      };

    case FETCH_MOVIES_ERROR:
      return {
        ...state, errorMessage: err
      };

    case FETCH_MOVIES_LOADING:
      return {
        ...state, isLoading: loader
      };

    case SET_FAVORITES_ID:
      return {
        ...state, favorites: state.favorites.map(favorite => favorite.id).includes(id) ? 
                             state.favorites.filter((favorite) => favorite.id !== id) : 
                             [...state.favorites, ...state.movies.filter((movie) => movie.id === id)]
      };

    case SET_MOVIES_PAGE:
      return {
        ...state, page: state.page + 1
      };

    default:
      return state;
  }
}

export default movies;