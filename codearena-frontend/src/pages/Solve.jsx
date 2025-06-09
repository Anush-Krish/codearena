import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from "../api/axiosInstance.jsx";
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';

export default function Solve() {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [submissionResult, setSubmissionResult] = useState(null);
    const [userInput, setUserInput] = useState('');
    const [aiReview, setAiReview] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {
        axiosInstance.get(`/problems/${id}`).then(res => setProblem(res.data));
    }, [id]);

    const handleAiReview = async () => {
        try {
            const { data } = await axiosInstance.post('problems/ai-review', { code });

            if (!data.review || typeof data.review !== 'string') {
                setAiReview('No AI review available for the provided code.');
                return;
            }
            
            const formattedReview = data.review.trim().replace(/\r\n/g, '\n');

            setAiReview(formattedReview);
        } catch (error) {
            console.error('AI Review Error:', error);
            setAiReview(`Error in AI review: ${error.response?.data?.message || error.message}`);
        }
    };


    const runCode = async () => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        try {
            const res = await axiosInstance.post(
                '/problems/run',
                {
                    code,
                    language: 'cpp',
                    problemId: id,
                    input: userInput
                },
                { signal: controller.signal }
            );
            setOutput(res.data.output);
        } catch (err) {
            if (err.name === 'CanceledError') {
                setOutput('Error: Code execution timed out on the client.');
            } else if (err.response?.data?.message?.includes('Time Limit Exceeded')) {
                setOutput('Time Limit Exceeded: Your code took too long to run.');
            } else if (err.response?.data?.message?.includes('Compilation Error')) {
                setOutput(`Compilation Error:\n${err.response.data.message}`);
            } else if (err.response?.data?.message?.includes('Runtime Error')) {
                setOutput(`Runtime Error:\n${err.response.data.message}`);
            } else {
                setOutput('Time Limit Exceeded.');
            }
        } finally {
            clearTimeout(timeout);
        }
    };


    const submit = async () => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        setError(null);
        try {
            const res = await axiosInstance.post(
                '/problems/submit',
                { code, language: 'cpp', problemId: id },
                { signal: controller.signal }
            );
            setSubmissionResult(res.data.result);
            alert('Submission sent!');
        } catch (err) {
            if (err.name === 'CanceledError') {
                setError('Submission timed out. Please try again.');
            } else {
                setError('Submission failed. Check your code or try again later.');
            }
            setSubmissionResult(null);
        } finally {
            clearTimeout(timeout);
        }
    };



    if (!problem) return <div className="text-center pt-10 text-neutral-300">Loading...</div>;

    return (
        <div className="mt-16 flex h-screen overflow-hidden">
            {/* Left: Problem Description */}
            <div className="w-1/2 overflow-y-auto border-r border-gray-700 bg-gray-900 p-6 text-neutral-300">
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

            {/* Right: Code Editor, Controls, Output */}
            <div className="w-1/2 flex flex-col bg-gray-950 p-6 text-neutral-200 overflow-y-auto">
                {/* CodeMirror Editor for C++ */}
                <p className="mb-2 text-sm text-neutral-400">C++ Code Editor</p>
                <CodeMirror
                    value={`//Write your C++ code here.`}
                    height="300px"
                    extensions={[cpp()]}
                    onChange={(value) => setCode(value)}
                    theme="dark"
                    className="rounded-lg border border-gray-700"
                />

                {/* Buttons */}
                <div className="mt-4 flex gap-4 flex-wrap">
                    <button onClick={runCode} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition">
                        Run
                    </button>
                    <button onClick={submit} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
                        Submit
                    </button>
                    <button onClick={handleAiReview} className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg transition">
                        AI Review
                    </button>
                </div>

                {/* Custom Input */}
                <textarea
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    placeholder="Enter custom input for your code"
                    className="w-full mt-4 h-24 resize-y rounded-lg border border-gray-700 bg-gray-900 p-3 font-mono text-sm placeholder-gray-500 focus:outline-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />

                {/* Submission Result */}
                {submissionResult && (
                    <div className="mt-4 font-semibold text-cyan-400">
                        Passed {submissionResult.passedCount} out of {submissionResult.totalTestCases} test cases.
                    </div>
                )}

                {/* Output */}
                {output && (
                    <pre className="mt-4 max-h-40 overflow-y-auto whitespace-pre-wrap rounded-lg border border-gray-700 bg-gray-800 p-4">
                        {output}
                    </pre>
                )}

                {/* AI Review */}
                {aiReview && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-purple-400 mb-2">AI Review:</h3>
                        <pre className="max-h-64 overflow-y-auto whitespace-pre-wrap rounded-lg border border-gray-700 bg-gray-800 p-4">
                            {aiReview}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}
