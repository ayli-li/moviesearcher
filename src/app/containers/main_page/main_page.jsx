/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { fetchMovies, fetchSearch, setInputValueSearch, setMoviesPage, setFavorite } from '../../actions/actionCreator';
import { SearchInput } from '../../components/input/input';
import { AsideGenres } from '../../components/aside_genres/aside_genres';

import './main_page.css';

let debounceApiSearch;

export const MainPage = () => {

  const [lastScrollY, setLastScrollY] = useState(0);

  const dispatch = useDispatch();

  const movies = useSelector(state => state.moviesItems.movies);
  const error = useSelector(state => state.moviesItems.errorMessage);
  const loader = useSelector(state => state.moviesItems.isLoading);
  const page = useSelector(state => state.moviesItems.page);
  const favorites = useSelector(state => state.moviesItems.favorites);
  const searchInput = useSelector(state => state.search.searchInput);
  const searchResult = useSelector(state => state.search.searchResult);

  const handleScroll = () => {
    const scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight);    
    
    if(window.scrollY + 1 > scrollHeight - window.innerHeight) {
      setLastScrollY(scrollHeight);
      if(scrollHeight >= lastScrollY) {        
        dispatch(setMoviesPage() );
      }      
    }        
  }

  const debounceSearch = (searchInputText) => {
    dispatch(fetchSearch(searchInputText) );
  }

  useEffect(() => {
    if(movies.length === 0) {
      dispatch(fetchMovies() );
    }
    
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [movies.length, dispatch])

  useEffect(() => {
    if (page > 1) {
      dispatch(fetchMovies() );
    }    
  }, [page, dispatch])

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

  const handleGenresClick = (event) => {
    console.log(event.target.id);
    console.log(movies.map(( { genre_ids } ) => genre_ids.includes(event.target.id)))

                      //.filter(ids => ids.includes(event.target.id) ) )
                      

  }
  
  const renderMovies = () => {   

    return(
      <div className="movies">
          {movies.map(( { poster_path, id, title } ) => {      
      
            const moviePoster = `https://image.tmdb.org/t/p/original/${poster_path}`;

            const setFavoriteClass = favorites
                                      .map(( {id} ) => id)
                                      .includes(id) ? "favorite_heart_active" : "favorite_heart_no-active";

            return <Link to={`/movie-page/${id}`} className="movie_link">
                      <img className="image" alt={title} src={moviePoster} key={id} />
                      <button className={setFavoriteClass} onClick={event => handleFavoriteClick(id, event)}>Heart</button>
                   </Link>
            })
          }
      </div>
    )
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
        <div className="container">
          <AsideGenres onClick={event => handleGenresClick(event)}/>       
          { renderMovies() }
        </div>
        { renderError() }
      </>  
      }
    </>   
  )
}