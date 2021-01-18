import { SET_INPUT_SEARCH, FETCH_MOVIES_SEARCH } from '../../constants';

const initialState = {
  searchInput: '',
  searchResult: [],
}

const search = (state = initialState, { type, search, searchResult } ) => {
  switch(type) {
    case SET_INPUT_SEARCH:
      return {...state, searchInput: search};
    case FETCH_MOVIES_SEARCH:
      return {...state, searchResult};
    default:
      return state;
  }     
}

export default search;