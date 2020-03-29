import React, {useState} from 'react';
import {Button, Col, Container, Form, InputGroup, Row, Pagination} from 'react-bootstrap';

const AppPagination = props => {
    const [pageValue, setPageValue] = useState(1);
    const pagesNumber = Math.ceil(props.totalPages / 10);

    const handlePageInputChanges = e => {
        let newPageValue = e.target.value <= 0 ? 1 : e.target.value;
        newPageValue = newPageValue > pagesNumber ? pagesNumber : newPageValue;

        setPageValue(newPageValue);
        props.pageChange(newPageValue);
    };

    const handlePageClick = newPageValue => {
        setPageValue(newPageValue);
        props.pageChange(newPageValue);
    };

    const handlePageFirst = () => {
        setPageValue(1);
        props.pageChange(1);
    };

    const handlePageLast = () => {
        setPageValue(pagesNumber);
        props.pageChange(pagesNumber);
    };

    const callSearchFunction = e => {
        e.preventDefault();
        props.pageChange(pageValue);
    };

    const pages = () => {
        if (props.totalPages === 0) {
            return [];
        }

        return Array(pagesNumber)
            .fill()
            .map((_, i) => i + 1);
    };

    const pagesRendered = pages().map((value, index) => {
        return (
            <Pagination.Item key={index} active={Number(value) === Number(pageValue)}
                             onClick={(_) => handlePageClick(value)}>
                {value}
            </Pagination.Item>
        );
    });

    const paginationBasic = (
        <div>
            <Pagination>
                <Pagination.First onClick={handlePageFirst} />
                <Pagination.Prev />
                {pagesRendered}
                <Pagination.Next />
                <Pagination.Last onClick={handlePageLast} />
            </Pagination>
        </div>
    );

    return (
        <Container className="m-3">
            <Row>
                <Col md={2}>
                    <Form className="pagination-form">
                        <InputGroup>
                            <Form.Control
                                value={pageValue}
                                onChange={handlePageInputChanges}
                                type="number"
                            />
                            <InputGroup.Append>
                                <Button onClick={callSearchFunction} type="submit">PAGE</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </Col>
                <Col md={10}>
                    {paginationBasic}
                </Col>
            </Row>
        </Container>
    );
};

export default AppPagination;
