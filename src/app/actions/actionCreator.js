import { FETCH_MOVIES_SUCCESS, FETCH_MOVIES_ERROR, FETCH_MOVIES_LOADING, FETCH_MOVIES_SEARCH, FETCH_MOVIE_SUCCESS, FETCH_MOVIE_ERROR, FETCH_MOVIE_LOADING } from '../../constants';
import axios from 'axios';

export const fetchMovies = () => async (dispatch, getState) => {
  const state = getState();
  console.log(state);

  dispatch( setMoviesLoader(true) );

  try {
    const movies = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=5866d05c7430c5fadecafbbaec52573d&language=en-US&page=');   
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

export const searchMovies = search => {
  return ({
    type: FETCH_MOVIES_SEARCH,
    search
  })
}

export const fetchMovie = (id) => async (dispatch) => {
  dispatch( setMovieLoader(true) );  
  //const id = this.props.match.params.id || '';
  //console.log(id);

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

// export const fetchSearch = (search) => async (dispatch) => { 
//   try {
//     const filteredSearch = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=5866d05c7430c5fadecafbbaec52573d&query=${search}`);
//     console.log(filteredSearch);
//     dispatch( searchMovies(filteredSearch.data.results) );
//   } catch(e) {
//       console.log(e);
//   }
// }