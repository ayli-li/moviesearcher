import { ADD_FAVORITE_MOVIE } from '../../constants';

const initialState = {
  ids: []
}

const favorites = (state = initialState, { type, ids }) => {
  switch(type) {

    case ADD_FAVORITE_MOVIE:
      return {...state, ids};
    
    default:
      return state;
  }
}

export default favorites;