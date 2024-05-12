import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import StarRating from '../StarRating/StarRating';
import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';

function MovieDetails( { movieID, watchedMovies, onAddWatched, onRemoveWatched, handleCloseMovie, apiURL } ) {
    const [movie, setMovie] = useState({});
    const [rating, setRating] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const isWatched = watchedMovies.map(movie => movie.imdbID).includes(movieID);

    const {
        Title: title, 
        Year: year, 
        Poster: poster,
        Runtime: runtime, 
        imdbRating,
        Plot: plot, 
        Released: released,
        Actors: actors, 
        Director: director, 
        Genre: genre,
    } = movie;

    function handleAdd() {
        const newWatchedMovie = { 
            imdbID: movieID,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            userRating: Number(rating),
            runtime: Number(runtime.split(" ")[0]),
         };

        onAddWatched(newWatchedMovie);
        handleCloseMovie();
    }

    function handleRemove() {
        onRemoveWatched(movieID);
        handleCloseMovie();
    }

    async function timedWait(secs) {
      await new Promise(r => setTimeout(r, secs));
    }

    useEffect(() => {
        async function getMovieDetails() {
            try {
                setIsLoading(true);
                setError('');
                // see https://www.omdbapi.com/ for details. &i is to search the movie ID
                const res = await fetch(apiURL + "&i=" + movieID);
                if (!res.ok) {
                    throw new Error('Something went wrong!');
                }
                const data = await res.json();
                if (data.Response === "False") {
                    throw new Error(data.Error);
                }
                // await timedWait(0);
                setMovie(data);
                isWatched && setRating(watchedMovies.find(movie => movie.imdbID === movieID).userRating);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        }
        getMovieDetails();
        setRating(0);
    },[movieID, apiURL, isWatched, watchedMovies]);
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
                                {!isWatched && (
                                <>
                                    <StarRating rating={rating}
                                        setRating={setRating} 
                                        maxRating={10} 
                                        size={28} />
                                    <button 
                                        className='btn-add' 
                                        onClick={handleAdd}>
                                            Add to Watched
                                    </button>
                                </>
                                )}
                                {isWatched && (
                                    <button 
                                        className='btn-remove'
                                        onClick={handleRemove} >
                                            Remove from Watched
                                    </button>
                                )}
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
    watchedMovies: PropTypes.array.isRequired,
    onAddWatched: PropTypes.func.isRequired,
}

export default MovieDetails;