import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import StarRating from '../StarRating/StarRating';
import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';

function MovieDetails( { movieID, handleCloseMovie, apiURL } ) {
    const [movie, setMovie] = useState({});
    const [rating, setRating] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const {Title: title, Year: year, Poster: poster,
        Runtime: runtime, imdbRating, Plot: plot, Released: released,
        Actors: actors, Director: director, Genre: genre
    } = movie;
    console.log("Title and year: ", title, year)

    async function timedWait(secs) {
      await new Promise(r => setTimeout(r, secs));
    }

    useEffect(() => {
        async function getMovieDetails() {
            setIsLoading(true);
            setError('');
            // see https://www.omdbapi.com/ for details. &i is to search the movie ID
            const res = await fetch(apiURL + "&i=" + movieID);
            const data = await res.json();
            await timedWait(1500);
            setMovie(data);
            setIsLoading(false);
        }
        getMovieDetails();
    },[movieID, apiURL]);
    return (
        <div className="details">
            {isLoading ? <Loader /> : 
                error ? <ErrorMessage message={error} /> : (
                <>
                    <header>
                        <button 
                            className='btn-back' 
                            onClick={handleCloseMovie}>
                                &larr;
                        </button>
                        <img src={poster} alt={`${title} poster`} />
                        <div className='details-overview'>
                            <h2>{title}</h2>
                            <p>{released} &bull; {runtime}</p>
                            <p>{genre}</p>
                            <p>
                                <span> ⭐️ {imdbRating} IMDb rating </span>
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className='rating'>
                            <StarRating maxRating={10} size={28} />
                        </div>
                        <p><em>{plot}</em></p>
                        <p>Starring: {actors}</p>
                        <p>Director: {director}</p>
                    </section>
                </>
            )}
        </div>
    )
}

MovieDetails.propTypes = {
    movieID: PropTypes.string.isRequired,
    handleCloseMovie: PropTypes.func,
    apiURL: PropTypes.string.isRequired,
}

export default MovieDetails;