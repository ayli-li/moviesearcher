import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { fetchMovie, fetchSearch, setInputValueSearch, setFavorite } from '../../actions/actionCreator';
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

  handleFavoriteClick(id, event) {
    const { setFavorite } = this.props;
    event.preventDefault();

    setFavorite(id);
  }

  componentDidMount() {
    const { favorites, fetchMovie } = this.props;
    favorites.map(( { id } ) => fetchMovie(id) );
  }

  renderFavorites = () => {  
    const { favorites } = this.props;

    return(        
        <div className="movies">
            {favorites.map(( { poster_path, id, title, isFavorite } ) => {       
          
              const moviePoster = `https://image.tmdb.org/t/p/original/${poster_path}`;

              return <Link to={`/movie-page/${id}`} className="movie_link">
                        <img className="image" alt={title} src={moviePoster} key={id} />
                        <button className={isFavorite ? "favorite_heart_active" : "favorite_heart_no-active"} onClick={(event) => this.handleFavoriteClick(id, event)}>Heart</button>
                    </Link>
              })
            }
        </div>
      )
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
    const { loader, searchInput, searchResult, favorites } = this.props;

    return (
      <>
       { loader ? <div>Loading,,,,,</div> : 
        <> 
          <SearchInput value={searchInput} onChange={event => this.handleInputChange(event)} searchResult={searchResult} />
          { favorites.length > 0 ? this.renderFavorites() : <h3>There is no favorite movies</h3> }      
          { this.renderError() }
        </>
        }
      </>      
    );
  }      
}

const mapStateToProps = (state) => {
  return ({
    favorites: state.moviesItems.favorites,
    movie: state.movie.movie,  
    error: state.movie.errorMessage,
    loader: state.movie.isLoading,
    searchInput: state.search.searchInput,
    searchResult: state.search.searchResult
  })
} 

export default connect(mapStateToProps, { fetchMovie,  fetchSearch, setInputValueSearch, setFavorite })(Favorites);