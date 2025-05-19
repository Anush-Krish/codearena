import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance.jsx';

export default function ProblemList() {
    const [problems, setProblems] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [difficulty, setDifficulty] = useState('');
    const [tags, setTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProblems = async () => {
        try {
            const params = new URLSearchParams();
            params.append('page', page);
            params.append('limit', limit);

            if (difficulty) params.append('difficulty', difficulty);
            tags.forEach(tag => params.append('tags', tag));

            const res = await axiosInstance.get(`/problems?${params.toString()}`);

            setProblems(res.data.result?.problems || []);
            setTotalPages(res.data.result?.totalPages || 1);

            // Extract unique tags from current page
            const allTags = new Set();
            (res.data.result?.problems || []).forEach(p => p.tags?.forEach(t => allTags.add(t)));
            setAvailableTags([...allTags]);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProblems();
    }, [page, difficulty, tags]);

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            <div className="flex flex-wrap gap-4 mb-6">
                {/* Difficulty Filter */}
                <select
                    value={difficulty}
                    onChange={e => setDifficulty(e.target.value)}
                    className="bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded"
                >
                    <option value="">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>

                {/* Tags Filter */}
                <div className="flex flex-wrap gap-2 items-center">
                    {availableTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() =>
                                setTags(prev =>
                                    prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                                )
                            }
                            className={`px-3 py-1 rounded-full border ${
                                tags.includes(tag)
                                    ? 'bg-blue-600 border-blue-600 text-white'
                                    : 'bg-gray-800 border-gray-600 text-gray-300'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Problem List */}
            <div className="space-y-4">
                {problems.length === 0 ? (
                    <p className="text-gray-400">No problems found.</p>
                ) : (
                    problems.map(p => (
                        <Link to={`/solve/${p._id}`} key={p._id}>
                            <div className="p-4 border border-gray-700 rounded bg-gray-900 text-white hover:bg-gray-800 transition cursor-pointer">
                                <h2 className="text-lg font-semibold">{p.title}</h2>
                                <p className="text-sm text-gray-400">{p.difficulty}</p>
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    {p.tags?.map(tag => (
                                        <span
                                            key={tag}
                                            className="text-xs bg-gray-700 px-2 py-1 rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center gap-4">
                <button
                    onClick={() => setPage(p => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>

                <span className="text-white px-2 py-2">Page {page}</span>

                <button
                    onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
