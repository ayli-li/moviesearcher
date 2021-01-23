import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './title.css';

const Title = ({ title }) => (
  <Link to={`/`} className="title__link">
    <h1 className="title">{title}</h1>
  </Link>  
);

Title.propTypes = {
  title: PropTypes.string,
}

Title.defaultProps = {
  title: 'Simple title',
}

export default Title;