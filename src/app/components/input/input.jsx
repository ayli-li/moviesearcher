import React from 'react';
import { Link } from 'react-router-dom';

import './input.css';

export const SearchInput = ( {value, onChange, searchResult} ) => {
  return <>
    <form className="input">
      <input type="text" value={value} onChange={onChange} /> 
    </form>
  
    <>
    { searchResult.length !== 0 && 
        searchResult.slice(0, 7).map(( { title, vote_average, id} ) =>  {
          return <div className="links">  
                   <Link to={`/movie_page/${id}`} className="link">
                     <span>{title}</span>
                     <span>{vote_average}</span>
                   </Link>
                 </div>
        })
    }
    </>
  </>
}