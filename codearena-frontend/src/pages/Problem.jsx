import { useEffect, useState } from 'react';
import axiosInstance from "../api/axiosInstance.jsx";
import { Link } from 'react-router-dom';

export default function Problems() {
    const [problems, setProblems] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axiosInstance.get('/problems').then(res => setProblems(res.data.result.problems));
    }, []);

    const search = problems.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="flex min-h-[70vh] flex-col items-center px-4 pt-6">
            <div className="w-full max-w-4xl">
                <input
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    placeholder="Search questions"
                    className="mb-6 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />

                <ul className="space-y-4">
                    {search.map(p => (
                        <li key={p._id} className="rounded-lg bg-gray-900 p-4 shadow-md hover:bg-gray-800 transition">
                            <Link to={`/solve/${p._id}`} className="flex justify-between items-center text-white">
                                <span className="font-medium">{p.title}</span>
                                <span
                                    className={`text-sm px-2 py-1 rounded-full ${
                                        p.difficulty === 'Easy'
                                            ? 'bg-green-600 text-white'
                                            : p.difficulty === 'Medium'
                                                ? 'bg-yellow-500 text-black'
                                                : 'bg-red-600 text-white'
                                    }`}
                                >
                                    {p.difficulty}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
