import React from 'react';
import './Header.css';

const Header = ({ title, show }) => (
    <div className={`header ${show ? 'show' : ''}`}>
        <h1>{title}</h1>
    </div>
);

export default Header;
