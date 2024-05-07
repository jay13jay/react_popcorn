import PropTypes from 'prop-types';
function Movie({ movie, className, selectedID, handleClick }) {
    const handleClickMovie = () => {
        handleClick(movie.imdbID === selectedID ? null : movie.imdbID);
    }
    return (
        <li 
            key={movie.imdbID}
            className={className}
            onClick={handleClickMovie} >
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
            <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
            </p>
            </div>
        </li>
    )
}

Movie.propTypes = {
    movie: PropTypes.object.isRequired,
    className: PropTypes.string,
    handleClick: PropTypes.func,
    selectedID: PropTypes.string,
}

export default Movie;