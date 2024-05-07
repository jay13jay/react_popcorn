import { useState } from "react";
import PropTypes from 'prop-types';
import ToggleButton from "../ToggleButton";
import Movie from "./Movie";

function MovieList({ selectedID, handleSelect, movies }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
                {isOpen && (
                    movies?.length === 0 ? (
                        <NoMovies />
                    ) :

                    <ul className="list list-movies">
                    {movies?.map((movie) => (
                        <Movie 
                            key={movie.imdbID} 
                            movie={movie}
                            handleClick={handleSelect}
                            selectedID={selectedID}
                            className={selectedID === movie.imdbID ? "list selected" : "list"} />
                        ))}
                    </ul>
                )}
        </>
    )
}

function NoMovies() {
    console.log("No movies found");
    return (
        <p className="error error-text">No movies found</p>
    )
}

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  handleSelect: PropTypes.func.isRequired,
  selectedID: PropTypes.string,
};


export default MovieList;