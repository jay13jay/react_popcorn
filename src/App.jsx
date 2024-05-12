import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import Navbar from "./Components/Nav/Navbar";
import Logo from "./Components/Nav/Logo";
import SearchBar from "./Components/Nav/SearchBar";
import Results from "./Components/Nav/Results";
import MovieList from "./Components/Movies/MovieList";
import WatchedMovieList from "./Components/Movies/WatchedMovieList";
import MovieDetails from "./Components/Movies/MovieDetails";
import Main from "./Components/Main";
import ListBox from "./Components/ListBox";
import Loader from "./Components/Loader";
import ErrorMessage from "./Components/ErrorMessage";

const apiKEY = "bd04a4b1";
// const apiKEY = "5d6b9c2c";   // wrong key for testing
const apiURL = "https://www.omdbapi.com/?apikey=" + apiKEY;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedID, setSelectedID] = useState(null);

  function handleCloseMovie() {
    setSelectedID(null);
  }

  async function timedWait(secs) {
    await new Promise(r => setTimeout(r, secs));
  }

  useEffect(function() {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(apiURL + "&s=" + query);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        setMovies(data.Search);
        // await new Promise(r => setTimeout(r, 1500));
        // timedWait(1500);
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
            <MovieList 
              selectedID={selectedID} 
              handleSelect={setSelectedID} 
              movies={movies} 
              error={error} />}
        </ListBox>
        <ListBox>
          {selectedID ? <MovieDetails 
                          movieID={selectedID}
                          handleCloseMovie={handleCloseMovie}
                          apiURL={apiURL} /> :
          <WatchedMovieList />}
        </ListBox>
        
      </Main>
    </>
  );
}
