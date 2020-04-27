
import React, { useState } from 'react';
import Search from './components/search';
import Table from './components/table';

export interface Tester {
    firstName: string,
    lastName: string,
    country: string,
    device: string,
    bugs: Bug[]
}

export interface Bug {
    id: number,
    title: string
}

const Home: React.FC = () => {

    const [data, setData] = useState<Tester[] | []>([])
    const [error, setError] = useState<string>('');

    const fetchData = async (testerName: string) => {
        try {
            const res = await fetch(`https://cors-anywhere.herokuapp.com/https://test-api.techsee.me/api/ex/${testerName}`)//fetch('https://jsonplaceholder.typicode.com/todos/1');
            const dataText = await res.text();
            const data = dataText.length ? JSON.parse(dataText) : []
            if (!Array.isArray(data)) {
                const dataArry: Tester[] = [data];
                setData(dataArry)
            } else {
                setData(data)
            }
            setError('');
        }
        catch (err) {
            setError('Temporary error occurred, please try again later');
        }
    }

    return (
        <section className="generalSection">
            <div className="container-fluid">
                <Search fetchData={fetchData} />
                {error ? <div className="errorMsg">{error}</div> : <Table fetchData={data} />}
            </div>
        </section>
    )
}

export default Home
