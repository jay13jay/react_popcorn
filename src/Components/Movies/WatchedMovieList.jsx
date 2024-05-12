import { useState } from "react";
import PropTypes from 'prop-types';
import ToggleButton from "../ToggleButton";
import WatchedMovie from "./WatchedMovie";

const average = (arr) =>
  arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);

function WatchedMovieList({watched}) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
          <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
          {isOpen && (
            <>
              <WatchedSummary watched={watched} />
              <ul className="list">
                {watched.map((movie) => (
                  <WatchedMovie key={movie.imdbID} movie={movie} />
                ))}
              </ul>
            </>
          )}
        </>
    )
}

function WatchedSummary({watched}) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating)).toFixed(1);
  const avgUserRating = average(watched.map((movie) => movie.userRating)).toFixed(1);
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(0);
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  )
}

WatchedMovieList.propTypes = {
  watched: PropTypes.array.isRequired
}
WatchedSummary.propTypes = {
  watched: PropTypes.array.isRequired
}



export default WatchedMovieList;