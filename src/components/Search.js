import React, {useState} from 'react';
import {Button, Col, Container, Form, InputGroup, Row} from 'react-bootstrap';

const Search = props => {
    const initialValue = 'berlin';
    const [searchValue, setSearchValue] = useState(initialValue);
    const pagesNumber = Math.ceil(props.totalPages / 10);

    const pageChangeFn = (page) => {
        let newPageValue = page <= 0 ? 1 : page;
        newPageValue = newPageValue > pagesNumber ? pagesNumber : newPageValue;

        props.pageChange(newPageValue);
    };

    const handlePageInputChanges = e => {
        pageChangeFn(e.target.value);
    };

    const handleSearchInputChanges = e => {
        setSearchValue(e.target.value);
    };

    const callSearchFunction = e => {
        e.preventDefault();
        props.search(searchValue);
    };

    //todo: add type selector - movie, series, episode

    return (
        <Container>
            <Row className="mt-3">
                <Col md={10}>
                    <Form>
                        <InputGroup>
                            <Form.Control type="text" placeholder="enter any value" value={searchValue}
                                          onChange={handleSearchInputChanges} />
                            <InputGroup.Append>
                                <Button variant="primary" type="submit" onClick={callSearchFunction}>
                                    SEARCH
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </Col>
                <Col md={2}>
                    <Form>
                        <InputGroup>
                            <Form.Control
                                value={props.pageValue}
                                onChange={handlePageInputChanges}
                                type="number"
                            />
                            <InputGroup.Append>
                                <Button onClick={callSearchFunction} type="submit">PAGE</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Search;
