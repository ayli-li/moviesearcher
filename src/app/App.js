import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Title from './components/title/title';
import Practice from './containers/practice/practice';
import MoviePage from './containers/movie_page/movie_page';

const App = () => (
  <>
    <Title title="Redux Practice" />
    <Switch>
      <Route exact path='/' component={Practice} />
      <Route exact path='/movie_page/:id' component={MoviePage} />
    </Switch>
  </>
);

export default App;