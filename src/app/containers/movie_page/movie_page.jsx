import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';

import { fetchMovie, fetchSearch, setInputValueSearch } from '../../actions/actionCreator';
import { SearchInput } from '../../components/input/input';

import './movie_page.css';

class MoviePage extends Component {

  constructor(props) {
    super();

    this.state = {
      activeFavoriteClassName: 'favorite_heart_no-active'
    }

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

  handleFavoriteClick(event) {
    const { ids } = this.props;
    ids.push(event.target.id);

  }

  componentDidMount() {
    const id = this.props.match.params.id || '';
    const { fetchMovie } = this.props;
    fetchMovie(id);
  }

  componentDidUpdate(prevProps) {
    const { fetchMovie } = this.props;
    const url = prevProps.history.location.pathname.split("movie-page/")[1];

    if(prevProps.match.params.id !== url) {
      fetchMovie(url);
    }
  }

  renderMovie = () => {
    const { movie } = this.props;
    if(movie) {
      const moviePoster = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

      return (
        <div className="data">
          <div className="movie_link">
            <img className="image movie_link" alt={movie.title} src={moviePoster} key={movie.id} />
            <span className={this.state.activeFavoriteClassName} id={movie.id} onClick={event => this.handleFavoriteClick(event)}>Heart</span>
          </div>
          <div>
            <div>{movie.title}</div>
            <div>{movie.overview}</div>    
            <div>{movie.vote_average}</div>
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
          { this.renderMovie() } 
          { this.renderError() }
        </>
        }
      </>      
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    movie: state.movie.movie,
    error: state.movie.errorMessage,
    loader: state.movie.isLoading,
    ids: state.favorites.ids,
    searchInput: state.search.searchInput,
    searchResult: state.search.searchResult
  })
} 

export default connect(mapStateToProps, { fetchMovie, setInputValueSearch, fetchSearch })(MoviePage);