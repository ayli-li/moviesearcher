import React from 'react';

import './aside_genres.css';
import genres from './genres_array';

export const AsideGenres = ( {onClick} ) => {
  return <>
    <aside>
      { genres.map(( { id, name } ) => {
          return  <ul>
                    <li  >
                      <label>
                        <input onClick={onClick} 
                               id={id}
                               type="checkbox" 
                               name={name} />
                        {name}
                      </label>
                    </li>
                  </ul>
          })
      }
    </aside>
  </>
}