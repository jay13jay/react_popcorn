import PropTypes from 'prop-types';
import { useState } from 'react';

function SearchBar({ setQuery }) {
    const [tempQuery, setTempQuery] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        setQuery(tempQuery);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="search"
                type="text"
                placeholder="Search..."
                value={tempQuery}
                onChange={(e) => setTempQuery(e.target.value)}
            />
        </form>
    )
}

SearchBar.propTypes = {
  setQuery: PropTypes.func.isRequired,
};


export default SearchBar;