import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMovies } from '../../actions/actionCreator';

import './practice.css';

class Practice extends Component {
  state = {
  }

  componentDidMount() {
    const { fetchMovies } = this.props;
    fetchMovies();
  }

  render() {
    const { movies } = this.props;

    return (
      <div className="images">
        {movies.map(movie => {        
          const moviePoster = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

          return <img className="image" alt={movie.title} src={moviePoster} />  
          })
        }
      </div>
    );
  }
}

const mapStateToProps = ({ moviesItems }) => ({
  movies: moviesItems.movies
})

export default connect(mapStateToProps, { fetchMovies })(Practice);