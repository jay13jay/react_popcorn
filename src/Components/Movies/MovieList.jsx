import { useState } from "react";
import PropTypes from 'prop-types';
import ToggleButton from "../ToggleButton";
import Movie from "./Movie";

function MovieList({ movies }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
          <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
          {isOpen && (
            <ul className="list">
              {movies?.map((movie) => (
                <Movie key={movie.imdbID} movie={movie} />
              ))}
            </ul>
          )}
        </>
    )
}

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
};


export default MovieList;