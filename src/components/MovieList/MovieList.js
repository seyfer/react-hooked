import Movie from '../Movie/Movie';
import React from 'react';
import './movies.css';
import {Col, Container, Row} from 'react-bootstrap';

const MovieList = props => {
    const moviesRendered = props.movies.map((movie, index) => (
        <Col md={3} className="mb-3">
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
        </Col>
    ));

    return (
        <Container fluid className="movies">
            <Row>
                {props.loading && !props.errorMessage ? (
                    <Col md={12}><span>loading...</span></Col>
                ) : props.errorMessage ? (
                    <Col md={12}>
                        <div className="errorMessage">{props.errorMessage}</div>
                    </Col>
                ) : (
                        moviesRendered
                    )}
            </Row>
        </Container>
    );
};

export default MovieList;
