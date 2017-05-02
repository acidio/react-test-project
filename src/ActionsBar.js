import React from 'react';
import PropTypes from 'prop-types';
import './ActionsBar.css';

const ActionsBar = ({ children }) => (
    <div className="actions">
        {children}
    </div>
);

ActionsBar.propTypes = {
    children: PropTypes.node
}

export default ActionsBar;
