import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ title, show }) => (
    <div className={`header ${show ? 'show' : ''}`}>
        <h1>{title}</h1>
    </div>
);

Header.propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool
}

export default Header;
