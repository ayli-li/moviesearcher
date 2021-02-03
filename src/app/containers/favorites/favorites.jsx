import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { fetchFavoriteMovies, fetchSearch, setInputValueSearch } from '../../actions/actionCreator';
import { SearchInput } from '../../components/input/input';

import './favorites.css';

class Favorites extends Component {

  constructor(props) {
    super();

    this.debounceApiSearch = debounce(this.debounceApiSearch.bind(this), 2000);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.removeIdFromArr = this.removeIdFromArr.bind(this);
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

  removeIdFromArr(arr, item) {
    for(let i = arr.length; i--;) {
      if(arr[i] === item) {
        arr.splice(i, 1);
      }
    }
  }

  handleFavoriteClick(event) {
    const { ids, isFavorite, setFavoriteMovie } = this.props;
    const id = event.target.id;    
    event.preventDefault();

    if (ids.includes(id) ) {
      setFavoriteMovie(false);
      this.removeIdFromArr(ids, id);
    } else {
      setFavoriteMovie(true);
      ids.push(id);
    }
    
    console.log(ids);
    console.log(isFavorite);
  }

  componentDidMount() {
    const { fetchFavoriteMovies, ids } = this.props;
    ids.map(id => fetchFavoriteMovies(id)); 
  }

  renderFavorites = () => {  
    const { favorites } = this.props; 
    console.log(favorites);

    if(favorites) {
      const moviePoster = `https://image.tmdb.org/t/p/original/${favorites.poster_path}`;

      return (
        <div className="movies">
          <div className="movie_link">
            <img className="image movie_link" alt={favorites.title} src={moviePoster} key={favorites.id} />
            <span className="favorite_heart_no-active" id={favorites.id} onClick={event => this.handleFavoriteClick(event)}>Heart</span>
          </div>          
        </div>
      )
    }
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

export default connect(mapStateToProps, { fetchFavoriteMovies, setInputValueSearch, fetchSearch })(Favorites);