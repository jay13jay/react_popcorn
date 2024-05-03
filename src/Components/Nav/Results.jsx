import PropTypes from "prop-types";
function Results({ movies }) {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    )
}

Results.propTypes = {
    movies: PropTypes.array.isRequired,
}

export default Results;