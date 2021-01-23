import { FETCH_MOVIES_SUCCESS, FETCH_MOVIES_ERROR, FETCH_MOVIES_LOADING, FETCH_MOVIES_SEARCH, FETCH_MOVIE_SUCCESS, FETCH_MOVIE_ERROR, FETCH_MOVIE_LOADING, SET_MOVIES_PAGE, SET_INPUT_SEARCH } from '../../constants';
import axios from 'axios';

export const fetchMovies = (pages) => async (dispatch, getState) => {
  const state = getState();
  console.log(state);

  dispatch( setMoviesLoader(true) );
  dispatch( setSearchResultValue('') );

  try {
    const movies = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=5866d05c7430c5fadecafbbaec52573d&language=en-US&page=${pages}`);   
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

export const moviesPage = page => {
  return ({
    type: SET_MOVIES_PAGE,
    page
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
  console.log(id);
  dispatch( setSearchResultValue('') );
  dispatch( setInputValueSearch([]) );
  dispatch( setMovieLoader(true) );  

  try {
    const movie = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=5866d05c7430c5fadecafbbaec52573d`);   
    dispatch( addMovie(movie.data) );
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