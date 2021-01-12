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

  renderMovies = () => {
    const { movies } = this.props;
    return(
      <div className="images">
          {movies.map(( { poster_path, id, title } ) => {       
      
            const moviePoster = `https://image.tmdb.org/t/p/original/${poster_path}`;

            return <img className="image" alt={title} src={moviePoster} key={id} />  
                         
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
    const { loader } = this.props;

    return (
      <>
       { loader ? <div>Loading,,,,,</div> : 
        <>
          { this.renderMovies() } 
          { this.renderError() }
        </>
        }
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return ({
    movies: state.moviesItems.movies,
    error: state.moviesItems.errorMessage,
    loader: state.moviesItems.isLoading,
  })
} 

export default connect(mapStateToProps, { fetchMovies })(Practice);