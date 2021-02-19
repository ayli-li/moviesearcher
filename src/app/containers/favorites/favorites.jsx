/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { fetchSearch, setInputValueSearch, setFavorite } from '../../actions/actionCreator';
import { SearchInput } from '../../components/input/input';

import './favorites.css';

let debounceApiSearch;

export const Favorites = () => {

  const dispatch = useDispatch();

  const favorites = useSelector(state => state.moviesItems.favorites);
  const error = useSelector(state => state.movie.errorMessage);
  const loader = useSelector(state => state.movie.isLoading);
  const searchInput = useSelector(state => state.search.searchInput);
  const searchResult = useSelector(state => state.search.searchResult);

  const debounceSearch = (searchInputText) => {
    dispatch(fetchSearch(searchInputText) );
  }

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

  const renderFavorites = () => {

    return(        
        <div className="movies">
            {favorites.map(( { poster_path, id, title } ) => {       
          
              const moviePoster = `https://image.tmdb.org/t/p/original/${poster_path}`;

              const setFavoriteClass = favorites
                                      .map(( {id} ) => id)
                                      .includes(id) ? "favorite_heart_active" : "favorite_heart_no-active";

              return <Link to={`/movie-page/${id}`} className="movie_link">
                        <img className="image" alt={title} src={moviePoster} key={id} />
                        <button className={setFavoriteClass} onClick={(event) => handleFavoriteClick(id, event)}>Heart</button>
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
        { favorites.length > 0 ? renderFavorites() : <h3>There is no favorite movies</h3> }  
        { renderError() }
      </> 
      }
    </>  
  )
}