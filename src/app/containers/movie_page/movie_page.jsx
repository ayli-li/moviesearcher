import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { fetchMovie, fetchSearch, setInputValueSearch, setFavorite } from '../../actions/actionCreator';
import { SearchInput } from '../../components/input/input';

import './movie_page.css';

let debounceApiSearch;

export const MoviePage = () => {

  const dispatch = useDispatch();

  const { id } = useParams();
  const url = useLocation();

  const movie = useSelector(state => state.movie.movie);
  const favorites = useSelector(state => state.moviesItems.favorites);
  const error = useSelector(state => state.movie.errorMessage);
  const loader = useSelector(state => state.movie.isLoading);
  const searchInput = useSelector(state => state.search.searchInput);
  const searchResult = useSelector(state => state.search.searchResult);

  const debounceSearch = (searchInputText) => {
    dispatch(fetchSearch(searchInputText) );
  }

  useEffect(() => {
    const movieId = id || '';
    const newUrl = url.pathname.split("movie-page/")[1];

    dispatch(fetchMovie(movieId) );

    if (movieId !== newUrl) {
      dispatch(fetchMovie(newUrl) );
    }
  }, [id, url, dispatch]);

  useEffect(() => {
    debounceApiSearch = debounce(debounceSearch, 2000)
  }, [])

  const handleFavoriteClick = (id, event) => {
    event.preventDefault();

    dispatch(setFavorite(id) );
  }

  const handleInputChange = (event) => {
    dispatch(setInputValueSearch(event.target.value) ); 
    debounceApiSearch(event.target.value);  
  }

  const renderMovie = () => {

    if(movie) {
      const moviePoster = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

      const setFavoriteClass = favorites
                                  .map(( {id} ) => id)
                                  .includes(movie.id) ? "favorite_heart_active" : "favorite_heart_no-active"; 
      return (
        <div className="data">
          <div className="movie_link">
            <img className="image" alt={movie.title} src={moviePoster} key={movie.id} />
            <button className={setFavoriteClass} onClick={(event) => handleFavoriteClick(movie.id, event)}>Heart</button>
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

  const renderError = () => {
    return(
      <>
        { error && <div>{error}</div> }
      </>
    )
  }

  return (
    <>
     { loader ? <div>Loading,,,,,</div> : 
      <> 
        <SearchInput value={searchInput} onChange={event => handleInputChange(event)} searchResult={searchResult} />        
        { renderMovie() } 
        { renderError() }
      </>
      }
    </>      
  );
}





// movie: state.movie.movie,
//     favorites: state.moviesItems.favorites,
//     error: state.movie.errorMessage,
//     loader: state.movie.isLoading,
//     searchInput: state.search.searchInput,
//     searchResult: state.search.searchResult