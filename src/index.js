import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App.js';
import { Provider } from 'react-redux';
import store from './app/store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Practice from './app/containers/practice/practice'
import MoviePage from './app/containers/movie_page/movie_page'

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      <App>
        <Switch>
          <Route exact path='/' component={Practice} />
          <Route path='/movie_page/:id' component={MoviePage} />
        </Switch>
      </App>
    </Provider>
  </BrowserRouter>
), document.getElementById('root'));
