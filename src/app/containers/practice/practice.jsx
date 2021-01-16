import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchMovies, searchMovies } from '../../actions/actionCreator';
import { SearchInput } from '../../components/input/input';

import './practice.css';

class Practice extends Component {

  componentDidMount() {
    const { fetchMovies } = this.props;
    fetchMovies();
  }

  renderMovies = () => {  
    const { movies, search } = this.props;

    const filteredMovies = search ? movies.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()) ) : movies; 

    return(
      <div className="images">
          {filteredMovies.map(( { poster_path, id, title } ) => {       
      
            const moviePoster = `https://image.tmdb.org/t/p/original/${poster_path}`;

            return <Link to={`/movie_page/${id}`}>
                      <img className="image" alt={title} src={moviePoster} key={id} />
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
          { this.renderMovies() } 
          { this.renderError() }
        </>
        }
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    movies: state.moviesItems.movies,
    error: state.moviesItems.errorMessage,
    loader: state.moviesItems.isLoading,
    search: state.search.searchInput,
  })
} 

export default connect(mapStateToProps, { fetchMovies, searchMovies })(Practice);

 // let filteredMovies = [];

 // if(search === '') {             
 //    filteredMovies.push(...movies);         
 // } else {
 //   movies.map((movie) => {         
 //     if(movie.title.toLowerCase().includes(search.toLowerCase() )) {
 //       filteredMovies.push(movie);
 //     } 
 //     return '';
 //   })      
 // } 
 // console.log(filteredMovies);