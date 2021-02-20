import React from 'react';

import './aside_genres.css';
import genres from './genres_array';

export const AsideGenres = ( {onClick} ) => {
  return <>
    <aside>
      { genres.map(( { id, name } ) => {
          return  <div key={id}>
                      <label>
                        <input onClick={onClick} 
                               id={id}
                               type="checkbox" 
                               name={name} />
                        {name}
                      </label>
                    </div>
          })
      }
    </aside>
  </>
}