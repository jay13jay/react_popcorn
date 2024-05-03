import { useState } from "react";

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
export default function App() {
  const [movies] = useState(tempMovieData);
  const [query, setQuery] = useState("");

  return (
    <>
      <Navbar Movies={movies}>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <Results movies={movies} />  
      </Navbar>

      <Main>
        <ListBox>
          <MovieList movies={movies} />
        </ListBox>
        <ListBox>
          <WatchedMovieList />
        </ListBox>
        
      </Main>
    </>
  );
}
