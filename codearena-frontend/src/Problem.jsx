import {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function Problems() {
    const [problems, setProblems] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios.get('/api/problems').then(res => setProblems(res.data));
    }, []);

    const filtered = problems.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="p-4">
            <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Filter problems"
                   className="border p-2 mb-4 w-full"/>
            <ul>
                {filtered.map(p => (
                    <li key={p._id} className="mb-2">
                        <Link to={`/solve/${p._id}`}
                              className="text-blue-600 hover:underline">{p.title} - {p.difficulty}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}