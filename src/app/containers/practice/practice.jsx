import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { fetchMovies, fetchSearch, setInputValueSearch } from '../../actions/actionCreator';
import { SearchInput } from '../../components/input/input';

import './practice.css';

class Practice extends Component {

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
    const { fetchMovies } = this.props;
    fetchMovies();
  }

  // componentDidUpdate(prevProps) {
  //   const { fetchMovies } = this.props;
  //   let nextPageStep = 1;
  //   console.log(prevProps);

  //   window.onscroll = () => (
  //       const scrollHeight = Math.max(
  //       document.body.scrollHeight, document.documentElement.scrollHeight,
  //       document.body.offsetHeight, document.documentElement.offsetHeight,
  //       document.body.clientHeight, document.documentElement.clientHeight);

  //       if (window.scrollY >= scrollHeight - window.innerHeight) {        
  //         fetchMovies(++nextPageStep);
  //         console.log(nextPageStep);
  //   }
  //   }
  // }

  renderMovies = () => {  
    const { movies } = this.props;

    // const filteredMovies = search ? movies.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()) ) : movies; 

    return(
      <div className="images">
          {movies.map(( { poster_path, id, title } ) => {       
      
            const moviePoster = `https://image.tmdb.org/t/p/original/${poster_path}`;

            return <Link to={`/movie-page/${id}`}>
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

  render() {
    const { loader, searchInput, searchResult } = this.props;   

    return (
      <>
       { loader ? <div>Loading,,,,,</div> : 
        <> 
          <SearchInput value={searchInput} onChange={event => this.handleInputChange(event)} searchResult={searchResult} />        
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
    page: state.moviesItems.page,
    searchInput: state.search.searchInput,
    searchResult: state.search.searchResult
  })
} 

export default connect(mapStateToProps, { fetchMovies, setInputValueSearch, fetchSearch })(Practice);

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