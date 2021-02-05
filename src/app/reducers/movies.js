import {
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_ERROR,
  FETCH_MOVIES_LOADING,
  SET_FAVORITES_ID,
  SET_MOVIES_PAGE,
  UPDATE_FAVORITE_LIST
} from '../../constants';

import { load, save } from 'redux-localstorage-simple';

const moviesStorage = load({ namespace: 'movies' });

const initialState = {
  movies: [],
  errorMessage: '',
  isLoading: false,
  page: 1,
  favorites: (moviesStorage && moviesStorage.moviesItems?.favorites) ? moviesStorage.moviesItems.favorites : []
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
        ...state, movies: state.movies.map((movie) => {
          
          if (movie.id === id) {
            console.log(id);
            localStorage.setItem('movies', JSON.stringify(movie));

            return {
              ...movie,             
              isFavorite: movie.isFavorite ? false : true
            }
          }
          return {...movie};
        }),
      };

    case UPDATE_FAVORITE_LIST:
      return {...state,
              favorites: state.movies.filter(movie => movie.isFavorite),
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