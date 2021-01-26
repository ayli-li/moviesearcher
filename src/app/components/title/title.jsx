import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './title.css';

const Title = ({ title }) => (
  <div className="title">
    <Link to={'/'} className="title_link">
      <h1 className="title_name">{title}</h1>
    </Link> 
    <Link to={'/favorites'} className="title_favorites">
      <span>Favorites</span>
    </Link>
  </div>
  

);

Title.propTypes = {
  title: PropTypes.string,
}

Title.defaultProps = {
  title: 'Simple title',
}

export default Title;