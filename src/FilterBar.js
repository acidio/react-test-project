import React from 'react';
import ActionsBar from './ActionsBar';
import './FilterBar.css';

const FilterBar = ({ show, filters, onValueChange, toggleFilters, resetFilters, numberOfItems }) => (
    <div>
        <ActionsBar>
            <span>{numberOfItems} registers found</span>
            <button className="btn" onClick={toggleFilters}>{!show ? 'Open filters' : 'Close filters'}</button>
            {filters.status !== '' && <a href="#" onClick={resetFilters}>Reset filters</a>}
        </ActionsBar>
        <div className={`filters ${show ? 'open' : ''}`}>
            <div>
                <label>Status:</label>
                <select value={filters.status} onChange={(e) => onValueChange(e, 'status')}>
                    <option value="">All</option>
                    <option value="automatic">Automatic</option>
                    <option value="reviewed">Reviewed</option>
                </select>
            </div>
        </div>
    </div>
);

export default FilterBar;
