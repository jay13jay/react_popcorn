import PropTypes from 'prop-types';

function SearchBar({ query, setQuery }) {
    return (
        <input
            className="search"
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    )
}

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};


export default SearchBar;