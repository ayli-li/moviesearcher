import {
  FETCH_GENRES_SUCCESS,
  FETCH_GENRES_ERROR,
  FETCH_GENRES_LOADING,
} from '../../constants';

const initialState = {
  genres: [],
  err: '',
  loader: false
}

const genres = (state = initialState, {
  type,
  genres,
  err,
  loader
}) => {
  switch (type) {
    case FETCH_GENRES_SUCCESS:
      return {
        ...state, genres
      }
    
    case FETCH_GENRES_ERROR:
      return {
        ...state, err
      }

    case FETCH_GENRES_LOADING:
      return {
        ...state, loader
      }

    default: 
      return state;
  }
}

export default genres;