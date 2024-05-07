import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import StarRating from '../StarRating/StarRating';

function MovieDetails( { movieID, handleCloseMovie, apiURL } ) {
    const [movie, setMovie] = useState({});

    const {Title: title, Year: year, Poster: poster,
        Runtime: runtime, imdbRating, Plot: plot, Released: released,
        Actors: actors, Director: director, Genre: genre
    } = movie;
    console.log("Title and year: ", title, year)

    useEffect(() => {
        async function getMovieDetails() {
            // see https://www.omdbapi.com/ for details. &i is to search the movie ID
            const res = await fetch(apiURL + "&i=" + movieID);
            const data = await res.json();
            setMovie(data);
        }
        getMovieDetails();
    },[movieID, apiURL]);
    return (
        <div className="details">
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
        </div>
    )
}

MovieDetails.propTypes = {
    movieID: PropTypes.string.isRequired,
    handleCloseMovie: PropTypes.func,
}

export default MovieDetails;