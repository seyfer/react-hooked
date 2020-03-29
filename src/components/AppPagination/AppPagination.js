import React from 'react';
import {Col, Container, Pagination, Row} from 'react-bootstrap';
import './pagination.css';

const AppPagination = props => {
    const pagesNumber = Math.ceil(props.totalPages / 10);

    const pageChangeFn = (page) => {
        let newPageValue = page <= 0 ? 1 : page;
        newPageValue = newPageValue > pagesNumber ? pagesNumber : newPageValue;
        props.pageChange(newPageValue);
    };

    const handlePageClick = newPageValue => {
        pageChangeFn(newPageValue);
    };

    const handlePageFirst = () => {
        pageChangeFn(1);
    };

    const handlePagePrevious = () => {
        pageChangeFn(props.pageValue - 1);
    };

    const handlePageNext = () => {
        pageChangeFn(props.pageValue + 1);
    };

    const handlePageLast = () => {
        pageChangeFn(pagesNumber);
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
            <Pagination.Item key={index} active={Number(value) === Number(props.pageValue)}
                             onClick={(_) => handlePageClick(value)}>
                {value}
            </Pagination.Item>
        );
    });

    const paginationBasic = (
        <div>
            <Pagination>
                <Pagination.First onClick={handlePageFirst} />
                <Pagination.Prev onClick={handlePagePrevious} />
                {pagesRendered}
                <Pagination.Next onClick={handlePageNext} />
                <Pagination.Last onClick={handlePageLast} />
            </Pagination>
        </div>
    );

    return (
        <Container className="m-3">
            <Row>
                <Col md={12}>
                    {paginationBasic}
                </Col>
            </Row>
        </Container>
    );
};

export default AppPagination;
