import React from 'react';

import './input.css';

export const SearchInput = ( {value, onChange} ) => (
    <form>
      <input type="text" value={value} onChange={onChange} /> 
    </form>
)