import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import Navbar from "./Components/Nav/Navbar";
import Logo from "./Components/Nav/Logo";
import SearchBar from "./Components/Nav/SearchBar";
import Results from "./Components/Nav/Results";
import MovieList from "./Components/Movies/MovieList";
import WatchedMovieList from "./Components/Movies/WatchedMovieList";
import Main from "./Components/Main";
import ListBox from "./Components/ListBox";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const apiKEY = "bd04a4b1";
// const apiKEY = "5d6b9c2c";
const apiURL = "https://www.omdbapi.com/?apikey=" + apiKEY + "&s=";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [getMovie, setGetMovie] = useState("adfda");

  async function timedWait(secs) {
    await new Promise(r => setTimeout(r, secs));
  }

  useEffect(function() {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(apiURL + query);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        setMovies(data.Search);
        // await new Promise(r => setTimeout(r, 1500));
        timedWait(1500);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    } 
    if (query) {
      setError('');
      fetchData();
    }
  }, [query]);

  useEffect(function() {
    console.log("Current query: ",query)
  },[query]);


  return (
    <>
      <Navbar Movies={movies}>
        <Logo />
        <SearchBar setQuery={setQuery} />
        <Results movies={movies} />  
      </Navbar>

      <Main>
        <ListBox>
          { isLoading ? <Loader /> :
           error ? <ErrorMessage message={error} /> :
          <MovieList movies={movies} error={error} />}
        </ListBox>
        <ListBox>
          <WatchedMovieList />
        </ListBox>
        
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <>
      <div className="error">
        <span>😰</span>
        <p>Unable to display movie list.</p>
      </div>
      <div className="error">
        Error: <p className="error-text"> {message} </p>
      </div>
    </>
  )
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
}
