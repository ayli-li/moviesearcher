import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { fetchMovies, fetchSearch, setInputValueSearch, setMoviesPage, setFavorite } from '../../actions/actionCreator';
import { SearchInput } from '../../components/input/input';

import './practice.css';

class Practice extends Component {

  constructor(props) {
    super();
    this.state = {
      lastScrollY: 0
    }

    this.debounceApiSearch = debounce(this.debounceApiSearch.bind(this), 2000);
    this.handleScroll = this.handleScroll.bind(this);
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

  handleScroll() {
    const { setMoviesPage } = this.props;
    const scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight);    
    
    if(window.scrollY + 1 > scrollHeight - window.innerHeight) {
      this.setState({ lastScrollY: scrollHeight });
      if(scrollHeight >= this.state.lastScrollY) {        
        setMoviesPage();
      }      
    }        
  }

  handleFavoriteClick(id, event) {
    const { setFavorite } = this.props;
    event.preventDefault();

    setFavorite(id);
  }  

  componentDidMount() {
    const { fetchMovies, movies } = this.props;
    if(movies.length === 0) {
      fetchMovies();
    }
    
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    const { fetchMovies, page } = this.props;

    if(prevProps.page !== page) {
      fetchMovies();
    }
  }  

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  renderMovies = () => {  
    const { movies, favorites } = this.props;

    // const filteredMovies = search ? movies.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()) ) : movies; 

    return(
      <div className="movies">
          {movies.map(( { poster_path, id, title } ) => {      
      
            const moviePoster = `https://image.tmdb.org/t/p/original/${poster_path}`;

            const setFavoriteClass = favorites
                                      .map(( {id} ) => id)
                                      .includes(id) ? "favorite_heart_active" : "favorite_heart_no-active";

            return <Link to={`/movie-page/${id}`} className="movie_link">
                      <img className="image" alt={title} src={moviePoster} key={id} />
                      <button className={setFavoriteClass} onClick={(event) => this.handleFavoriteClick(id, event)}>Heart</button>
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
          <SearchInput value={searchInput} onChange={event => this.handleInputChange(event)} searchResult={searchResult} />        
          { this.renderMovies() }
          { loader && <div>Loading,,,,,,,</div>}
          { this.renderError() }
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
    favorites: state.moviesItems.favorites,
    searchInput: state.search.searchInput,
    searchResult: state.search.searchResult
  })
} 

export default connect(mapStateToProps, { fetchMovies, fetchSearch, setInputValueSearch, setMoviesPage, setFavorite })(Practice);

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