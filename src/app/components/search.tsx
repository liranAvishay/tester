
import React, { useState } from 'react';

interface SearchProp {
    fetchData: (searchText:string) => void
}

const Search: React.FC<SearchProp> = (props) => {
    const { fetchData } = props
    const [searchText, setSearchText] = useState<string>('')
    const [isValid, setIsValid] = useState<boolean>(false)

    const checkValidation = (value: string): boolean => (value.length > 1 && value.length < 13)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value.trim();
        setSearchText(value);
        setIsValid(checkValidation(value));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (isValid) {
            fetchData(searchText)
        }
    }

    return (
        <div className="searchContainer">
            <form onSubmit={handleSubmit}>
                <input 
                    onChange={handleChange} 
                    type="text" 
                    style={{ color: isValid ? '#000' : '#ff0000' }} 
                    className="formControl" 
                    placeholder="Enter the tester name" />
                <button disabled={!isValid} className="btn btn--fetch" type="submit">Fetch</button>
            </form>
        </div>
    )
}

export default Search