import { SET_FAVORITE_MOVIE, FETCH_FAVORITES_SUCCESS, FETCH_FAVORITES_ERROR, FETCH_FAVORITES_LOADING } from '../../constants';

const initialState = {
  isFavorite: false,
  favorites: [],  
  errorMessage: '',
  isLoading: false,
  ids: []
}

const favorites = (state = initialState, { type, isFavorite, favorites, err, loader, id }) => {
  switch(type) {

    case SET_FAVORITE_MOVIE:
      return {...state, isFavorite};

    case FETCH_FAVORITES_SUCCESS:
      return {...state, favorites};

    case FETCH_FAVORITES_ERROR:
      return {...state, errorMessage: err};
    
    case FETCH_FAVORITES_LOADING:
      return {...state, isLoading: loader};

    // case SET_FAVORITES_ID:
    //   return {...state, id}
    
    default:
      return state;
  }
}

export default favorites;