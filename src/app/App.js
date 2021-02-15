import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Title from './components/title/title';
import { MainPage } from './containers/practice/practice';
import Favorites from './containers/favorites/favorites';
import MoviePage from './containers/movie_page/movie_page';

const App = () => (
  <>
    <Title title="Redux Practice" />
    <Switch>
      <Route exact path='/' component={MainPage} />
      <Route path='/favorites' component={Favorites} />
      <Route path='/movie-page/:id' component={MoviePage} />
    </Switch>
  </>
);

export default App;