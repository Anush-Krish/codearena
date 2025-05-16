import {useEffect, useState} from 'react';
import axiosInstance from "./api/axiosInstance.jsx";
import {Link} from 'react-router-dom';

export default function Problems() {
    const [problems, setProblems] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axiosInstance.get('/problems').then(res => setProblems(res.data.result.problems));
    }, []);

    const filtered = problems.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="p-4">
            <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Filter problems"/>
            <ul>
                {filtered.map(p => (
                    <li key={p._id} className="mb-2">
                        <Link to={`/solve/${p._id}`}>{p.title} - {p.difficulty}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}