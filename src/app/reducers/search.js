import { FETCH_MOVIES_SEARCH } from '../../constants';

const initialState = {
  searchInput: '',
}

const search = (state = initialState, { type, search } ) => {
  switch(type) {
    case FETCH_MOVIES_SEARCH:
      return {...state, searchInput: search};
    default:
      return state;
  }     
}

export default search;