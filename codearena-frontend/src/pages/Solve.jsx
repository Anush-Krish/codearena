import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axiosInstance from "../api/axiosInstance.jsx";

export default function Solve() {
    const {id} = useParams();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [submissionResult, setSubmissionResult] = useState(null);
    const [userInput, setUserInput] = useState('');
    const [aiReview, setAiReview] = useState('');


    useEffect(() => {
        axiosInstance.get(`/problems/${id}`).then(res => setProblem(res.data));
    }, [id]);

    const handleAiReview = async () => {
        const payload = {
            code
        };

        try {
            const {data} = await axiosInstance.post('problems/ai-review', payload);
            setAiReview(data.review);
        } catch (error) {
            setAiReview('Error in AI review, error: ' + error.message);
        }
        ;
    };
    const runCode = async () => {
        try {
            const res = await axiosInstance.post('/problems/run', {
                code,
                language: 'cpp',
                problemId: id,
                input: userInput
            });
            setOutput(res.data.output);
        } catch {
            setOutput('Error running code');
        }
    };

    const submit = async () => {
        try {
            const res = await axiosInstance.post('/problems/submit', {code, language: 'cpp', problemId: id});
            alert('Submission sent');
            setSubmissionResult(res.data.result);
        } catch {
            alert('Failed to submit');
            setSubmissionResult(null);
        }
    };

    if (!problem) return <div className="text-center pt-10 text-neutral-300">Loading...</div>;

    return (
        <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto p-5">
            {/* Problem Description */}
            <div
                className="flex-1 min-w-[300px] max-h-[600px] overflow-y-auto rounded-lg border border-gray-700 bg-gray-900 p-6 text-neutral-300">
                <h1 className="text-2xl font-semibold mb-4">{problem.title}</h1>
                <p className="whitespace-pre-wrap">{problem.description}</p>

                {Array.isArray(problem.sampleSol) && problem.sampleSol.length > 0 && (
                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">Sample Input:</h3>
                        <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                            {problem.sampleSol[0].Input}
                        </pre>

                        <h3 className="font-semibold mt-4 mb-2">Sample Output:</h3>
                        <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                            {problem.sampleSol[0].Output}
                        </pre>
                    </div>
                )}
            </div>

            {/* Code Editor & Controls */}
            <div className="flex-1 min-w-[300px] flex flex-col">
                <textarea
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder="// Write your C++ code here"
                    className="w-full h-72 resize-y rounded-lg border border-gray-700 bg-gray-900 p-4 font-mono text-sm text-neutral-200 placeholder-gray-500 focus:outline-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />

                <div className="mt-4 flex gap-4">
                    <button
                        onClick={runCode}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
                    >
                        Run
                    </button>
                    <button
                        onClick={submit}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                    >
                        Submit
                    </button>
                    <button
                        onClick={handleAiReview}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg transition"
                    >
                        AI Review
                    </button>

                </div>
                <div className="mt-4">
                    <textarea
                        value={userInput}
                        onChange={e => setUserInput(e.target.value)}
                        placeholder="Enter custom input for your code"
                        className="w-full h-24 resize-y rounded-lg border border-gray-700 bg-gray-900 p-3 font-mono text-sm text-neutral-200 placeholder-gray-500 focus:outline-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                </div>

                {submissionResult && (
                    <div className="mt-6 font-semibold text-cyan-400">
                        Passed {submissionResult.passedCount} out of {submissionResult.totalTestCases} test cases.
                    </div>
                )}

                {output && (
                    <pre
                        className="mt-6 max-h-48 overflow-y-auto whitespace-pre-wrap rounded-lg border border-gray-700 bg-gray-800 p-4 text-neutral-200">
                        {output}
                    </pre>
                )}
                {aiReview && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-purple-400 mb-2">AI Review:</h3>
                        <pre
                            className="max-h-64 overflow-y-auto whitespace-pre-wrap rounded-lg border border-gray-700 bg-gray-800 p-4 text-neutral-200">
            {aiReview}
        </pre>
                    </div>
                )}

            </div>


        </div>
    );
}
