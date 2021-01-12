import { FETCH_MOVIES_SUCCESS, FETCH_MOVIES_ERROR, FETCH_MOVIES_LOADING } from '../../constants';
import axios from 'axios';

export const fetchMovies = () => async (dispatch, getState) => {
  const state = getState();
  console.log(state);

  dispatch( setLoader(true) );

  try {
    const movies = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=5866d05c7430c5fadecafbbaec52573d&language=en-US&page=');   
    console.log(movies);
    dispatch( addMovies(movies.data.results) );
    dispatch( setLoader(false) );   
  } catch {    
    dispatch( errMovies('Что-то пошло не так,,,,,,,,') );
    dispatch( setLoader(false) );
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

const setLoader = loader => {
  return ({
    type: FETCH_MOVIES_LOADING,
    loader
  })
}