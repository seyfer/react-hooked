import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import Header from '../Header/Header';
import Movie from '../Movie/Movie';
import Search from '../Search';
import AppPagination from '../AppPagination/AppPagination';
import {Alert, Col, Container, Row} from 'react-bootstrap';

const App = () => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [pageValue, setPageValue] = useState(1);
    const [searchValue, setSearchValue] = useState('berlin');
    const [totalPages, setTotalPages] = useState(0);

    const apiKey = '4a3b711b'; // you should replace this with yours

    const buildApiUrl = (searchValue, pageValue) => {
        return `https://www.omdbapi.com/?s=${searchValue}&apikey=${apiKey}&page=${pageValue}`;
    };

    const search = (searchValue, pageValue) => {
        setLoading(true);
        setErrorMessage(null);

        const url = buildApiUrl(searchValue, pageValue);

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

    const memoizedSearch = useCallback(search, []);

    useEffect(() => {
        memoizedSearch(searchValue, pageValue);
    }, [memoizedSearch, searchValue, pageValue]);

    const handleSearchChange = searchParam => {
        setSearchValue(searchParam);
        search(searchParam, pageValue);
    };

    const handlePageChange = page => {
        setPageValue(page);
        search(searchValue, page);
    };

    const renderedPagination = (
        <Row>
            <Col md={12}>
                <AppPagination pageChange={handlePageChange} totalPages={totalPages} pageValue={pageValue} />
            </Col>
        </Row>
    );

    return (
        <div className="App">
            <Header text="HOOKED" />
            <Container>
                <Row>
                    <Col md={12}><Search search={handleSearchChange} pageChange={handlePageChange} pageValue={pageValue}
                                         totalPages={totalPages} /></Col>
                </Row>
                {renderedPagination}
                <Row>
                    <Col md={12}>
                        <Alert variant={'light'}>
                            <h3>Sharing a few of our favourite movies</h3>
                        </Alert>
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
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default App;
