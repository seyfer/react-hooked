import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';
import Pagination from './Pagination';

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b'; // you should replace this with yours

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [pageValue, setPageValue] = useState(1);
  const [searchValue, setSearchValue] = useState('berlin');
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    /* fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      }); */
    search(searchValue, pageValue);
  }, [searchValue, pageValue]);

  const search = (searchValue, pageValue) => {
    setLoading(true);
    setErrorMessage(null);

    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b&page=${pageValue}`;

    if (!searchValue) {
      setErrorMessage('Empty search value');
      setLoading(false);
      return;
    }

    fetch(url)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === 'True') {
          setMovies(jsonResponse.Search);
          setTotalPages(Number(jsonResponse.totalResults));
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };

  const handleSearchChange = searchParam => {
    setSearchValue(searchParam);
    search(searchParam, pageValue);
  };

  const handlePageChange = page => {
    setPageValue(page);
    search(searchValue, page);
  };

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={handleSearchChange} />
      <Pagination pageChange={handlePageChange} totalPages={totalPages} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
