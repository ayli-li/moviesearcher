import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMovie, searchMovies } from '../../actions/actionCreator';
import { SearchInput } from '../../components/input/input';

import './movie_page.css';

class MoviePage extends Component {

  componentDidMount() {
    const id = this.props.match.params.id || '';
    const { fetchMovie } = this.props;
    fetchMovie(id);
  }

  renderMovie = () => {
    const { movie } = this.props;
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

  renderError = () => {
    const { error } = this.props;
    return(
      <>
        { error && <div>{error}</div> }
      </>
    )
  }

  handleInputChange(event) {
    const { searchMovies } = this.props;
    searchMovies(event.target.value);
  }

  render() {
    const { loader, search } = this.props;

    return (
      <>
       { loader ? <div>Loading,,,,,</div> : 
        <> 
          <SearchInput value={search} onChange={event => this.handleInputChange(event)} />        
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
    search: state.search.searchInput,
  })
} 

export default connect(mapStateToProps, { fetchMovie, searchMovies })(MoviePage);