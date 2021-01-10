import { FETCH_MOVIES_SUCCESS } from '../../constants';
import axios from 'axios';

export const fetchMovies = () => async (dispatch) => {
  try {
    const movies = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=5866d05c7430c5fadecafbbaec52573d&language=en-US&page=');
    console.log(movies);
    dispatch( addMovies(movies.data.results) );
  } catch(e) {
    console.log(e);
  }
}//зачем вызывать один экшн в другом?

export const addMovies = movies => {
  return ({
  type: FETCH_MOVIES_SUCCESS,
  movies
  })
}