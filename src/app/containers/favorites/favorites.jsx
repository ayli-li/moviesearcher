import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { fetchSearch, setInputValueSearch } from '../../actions/actionCreator';
import { SearchInput } from '../../components/input/input';

import './favorites.css';

class Favorites extends Component {

  constructor(props) {
    super();

    this.debounceApiSearch = debounce(this.debounceApiSearch.bind(this), 2000);
  }

  debounceApiSearch(searchInputText) {
    const { fetchSearch } = this.props;
    fetchSearch(searchInputText);
  }

  handleInputChange(event) {
    const { setInputValueSearch } = this.props;
    setInputValueSearch(event.target.value); 
    this.debounceApiSearch(event.target.value);  
  }

  componentDidMount() {

  }

  renderFavorites = () => {  
    
  }

  renderError = () => {
    const { error } = this.props;
    return(
      <>
        { error && <div>{error}</div> }
      </>
    )
  }

  render() {
    const { loader, searchInput, searchResult } = this.props;

    return (
      <>
       { loader ? <div>Loading,,,,,</div> : 
        <> 
          <SearchInput value={searchInput} onChange={event => this.handleInputChange(event)} searchResult={searchResult} />
          { this.renderFavorites() }
          { loader && <div>Loading,,,,,,,</div>}        
          { this.renderError() }
        </>
        }
      </>      
    );
  }      
}

const mapStateToProps = (state) => {
  return ({
     //isFavorite: state.favorites.isFavorite,
     //ids: state.favorites.ids,
     //error: state.favorites.errorMessage,
     //loader: state.favorites.isLoading,  
     //favorites: state.favorites.favorites,   
     searchInput: state.search.searchInput,
     searchResult: state.search.searchResult
  })
} 

export default connect(mapStateToProps, { setInputValueSearch, fetchSearch })(Favorites);