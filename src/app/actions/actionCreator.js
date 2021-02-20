import { FETCH_MOVIES_SUCCESS, FETCH_MOVIES_ERROR, FETCH_MOVIES_LOADING, FETCH_MOVIES_SEARCH, FETCH_MOVIE_SUCCESS, FETCH_MOVIE_ERROR, FETCH_MOVIE_LOADING, FETCH_GENRES_SUCCESS, FETCH_GENRES_ERROR, FETCH_GENRES_LOADING, SET_MOVIES_PAGE, SET_INPUT_SEARCH, SET_FAVORITES_ID } from '../../constants';
import axios from 'axios';

export const fetchMovies = () => async (dispatch, getState) => {
  const state = getState();
  const page = state.moviesItems.page;

  dispatch( setMoviesLoader(true) );
  dispatch( setSearchResultValue('') );

  try {
    const movies = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=5866d05c7430c5fadecafbbaec52573d&language=en-US&page=${page}`);
    dispatch( addMovies(movies.data.results) );
    dispatch( setMoviesLoader(false) );   
  } catch {    
    dispatch( errMovies('Что-то пошло не так,,,,,,,,') );
    dispatch( setMoviesLoader(false) );
  }
}

const addMovies = movies => {
  return ({
    type: FETCH_MOVIES_SUCCESS,
    movies
  })
}

const errMovies = err => {
  return ({
    type: FETCH_MOVIES_ERROR,
    err
  })
}

const setMoviesLoader = loader => {
  return ({
    type: FETCH_MOVIES_LOADING,
    loader
  })
}

export const setMoviesPage = () => {
  return ({
    type: SET_MOVIES_PAGE
  })
}

export const setInputValueSearch = search => {
  return ({
    type: SET_INPUT_SEARCH,
    search
  })
}

const setSearchResultValue = searchResult => {
  return ({
    type: FETCH_MOVIES_SEARCH,
    searchResult
  })
}

export const fetchSearch = (search) => async (dispatch) => { 
  try {
    const filteredSearch = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=5866d05c7430c5fadecafbbaec52573d&query=${search}`);
    dispatch( setSearchResultValue(filteredSearch.data.results) );
  } catch(e) {
      console.log(e);
  }
}

export const fetchMovie = (id) => async (dispatch) => {

  dispatch( setSearchResultValue('') );
  dispatch( setInputValueSearch([]) );
  dispatch( setMovieLoader(true) );  

  try {
    const movie = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=5866d05c7430c5fadecafbbaec52573d`);
    const updateMovies = {...movie.data, isFavorite: false};
    dispatch( addMovie(updateMovies) );
    dispatch( setMovieLoader(false) );   
  } catch {    
    dispatch( errMovie('Что-то пошло не так,,,,,,,,') );
    dispatch( setMovieLoader(false) );
  }
}

const addMovie = movie => {
  return ({
    type: FETCH_MOVIE_SUCCESS,
    movie
  })
}

const errMovie = err => {
  return ({
    type: FETCH_MOVIE_ERROR,
    err
  })
}

const setMovieLoader = loader => {
  return ({
    type: FETCH_MOVIE_LOADING,
    loader
  })
}

export const setFavorite = id => (dispatch) => {

  dispatch( changeFavorite(id) );
  dispatch( saveFavoritesInLocalStorage() );
}

const changeFavorite = id => {
  return ({
    type: SET_FAVORITES_ID,
    id
  })
}

const saveFavoritesInLocalStorage = () => (dispatch, getState) => {
  const state = getState();
  const currentFavorites = state.moviesItems.favorites;

  updateLocalStorage(currentFavorites);
}

const updateLocalStorage = (currentState) => {
  localStorage.setItem('movies', JSON.stringify(currentState) );
}

export const fetchMoviesGenres = () => async (dispatch, getState) => {
  const state = getState();
  console.log(state);
  dispatch( setGenresLoader(true) ); 

  try {
    const genres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=5866d05c7430c5fadecafbbaec52573d&language=en-US`);    
    dispatch( addGenres(genres) );
    dispatch( setGenresLoader(false) );   
  } catch {    
    dispatch( errGenres('Что-то пошло не так,,,,,,,,') );
    dispatch( setGenresLoader(false) );
  }
}

const addGenres = genre => {
  return ({
    type: FETCH_GENRES_SUCCESS,
    genre
  })
}

const errGenres = err => {
  return ({
    type: FETCH_GENRES_ERROR,
    err
  })
}

const setGenresLoader = loader => {
  return ({
    type: FETCH_GENRES_LOADING,
    loader
  })
}