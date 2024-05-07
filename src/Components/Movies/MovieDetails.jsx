import PropTypes from 'prop-types';
function MovieDetails( { movieID, handleCloseMovie } ) {
    return (
        <div className="details">
            <button 
                className='btn-back' 
                onClick={handleCloseMovie}>
                    &larr;
            </button>
            <h2>Movie Details</h2>
            <p>{movieID}</p>
        </div>
    )
}

MovieDetails.propTypes = {
    movieID: PropTypes.string.isRequired,
    handleCloseMovie: PropTypes.func,
}

export default MovieDetails;