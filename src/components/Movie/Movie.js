import React from 'react';
import {Card} from 'react-bootstrap';
import './movie.css';

const DEFAULT_PLACEHOLDER_IMAGE =
    'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg';

const Movie = ({movie}) => {
    const poster = movie.Poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
    return (
        <div className="movie">
            <Card.Header>{movie.Title}</Card.Header>
            <Card>
                <Card.Img height={333} variant="top"
                          alt={`The movie titled: ${movie.Title}`}
                          src={poster} />
                <Card.Body>
                    <Card.Title>({movie.Year})</Card.Title>
                    <Card.Link href={'https://www.imdb.com/title/' + movie.imdbID} target="_blank">Open on IMBD</Card.Link>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Movie;
