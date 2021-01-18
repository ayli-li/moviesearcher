import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';

import { fetchMovie, fetchSearch, setInputValueSearch } from '../../actions/actionCreator';
import { SearchInput } from '../../components/input/input';

import './movie_page.css';

class MoviePage extends Component {

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
    const id = this.props.match.params.id || '';
    const { fetchMovie } = this.props;
    fetchMovie(id);
  } 

  // handleIdChange() {
  //   const apiId = this.props.match.params.id || '';
  //   const { movie } = this.props;
  //   if(apiId !== movie.id) {
  //     this.renderMovie();
  //   }
  // }

  // componentDidUpdate() {
  //   const id = this.props.match.params.id || '';
  //   const { movie } = this.props;
  //   console.log(id);
  //   console.log(movie.id);
  //   if(id !== movie.id) {
  //     this.renderMovie();
  //   }
  // }

  renderMovie = () => {
    const { movie } = this.props;
    if(movie) {
      const moviePoster = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

      return (
        <div className="data">
          <div>
            <img className="image" alt={movie.title} src={moviePoster} key={movie.id} />
          </div>
          <div>{movie.title}</div>
          <div>{movie.overview}</div>    
          <div>{movie.vote_average}</div>
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
          { this.handleIdChange() }
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
    searchInput: state.search.searchInput,
    searchResult: state.search.searchResult
  })
} 

export default connect(mapStateToProps, { fetchMovie, setInputValueSearch, fetchSearch })(MoviePage);