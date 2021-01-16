import React from 'react';

import Title from './components/title/title';

const App = ({ children }) => (
  <>
    <Title title="Redux Practice" />
    {children}
  </>
);

export default App;