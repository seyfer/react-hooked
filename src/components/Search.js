import React, {useState} from 'react';
import {Button, Form, InputGroup} from 'react-bootstrap';

const Search = props => {
    const initialValue = 'berlin';
    const [searchValue, setSearchValue] = useState(initialValue);

    const handleSearchInputChanges = e => {
        setSearchValue(e.target.value);
    };

    const callSearchFunction = e => {
        e.preventDefault();
        props.search(searchValue);
    };

    return (
        <Form className="search">
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
    );
};

export default Search;
