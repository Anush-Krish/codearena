import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from "../api/axiosInstance.jsx";

export default function Solve() {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [submissionResult, setSubmissionResult] = useState(null);

    useEffect(() => {
        axiosInstance.get(`/problems/${id}`).then(res => setProblem(res.data));
    }, [id]);

    const runCode = async () => {
        try {
            const res = await axiosInstance.post('/problems/run', { code, language: 'cpp', problemId: id });
            setOutput(res.data.output);
        } catch {
            setOutput('Error running code');
        }
    };

    const submit = async () => {
        try {
            const res = await axiosInstance.post('/problems/submit', { code, language: 'cpp', problemId: id });
            alert('Submission sent');
            setSubmissionResult(res.data.result);
        } catch {
            alert('Failed to submit');
            setSubmissionResult(null);
        }
    };

    if (!problem) return <div>Loading...</div>;

    return (
        <div
            style={{
                display: 'flex',
                gap: '20px',
                padding: '20px',
                maxWidth: '900px',
                margin: 'auto',
            }}
        >

            <div
                style={{
                    flex: '1 1 40%',
                    border: '1px solid #ccc',
                    padding: '15px',
                    borderRadius: '6px',
                    overflowY: 'auto',
                    maxHeight: '600px',
                }}
            >
                <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>{problem.title}</h1>
                <p style={{ whiteSpace: 'pre-wrap' }}>{problem.description}</p>

                {Array.isArray(problem.sampleSol) && problem.sampleSol.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                        <h3>Sample Input:</h3>
                        <pre
                            style={{
                                backgroundColor: '#f0f0f0',
                                padding: '10px',
                                borderRadius: '4px',
                                overflowX: 'auto',
                            }}
                        >
                            {problem.sampleSol[0].Input}
                        </pre>

                        <h3>Sample Output:</h3>
                        <pre
                            style={{
                                backgroundColor: '#f0f0f0',
                                padding: '10px',
                                borderRadius: '4px',
                                overflowX: 'auto',
                            }}
                        >
                            {problem.sampleSol[0].Output}
                        </pre>
                    </div>
                )}
            </div>


            <div style={{ flex: '1 1 60%' }}>
                <textarea
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder="// Write your C++ code here"
                    style={{
                        width: '100%',
                        height: '300px',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        resize: 'vertical',
                    }}
                />

                <div style={{ marginTop: '10px' }}>
                    <button
                        onClick={runCode}
                        style={{
                            backgroundColor: '#22c55e',
                            color: 'white',
                            padding: '10px 15px',
                            borderRadius: '6px',
                            border: 'none',
                            marginRight: '10px',
                            cursor: 'pointer',
                        }}
                    >
                        Run
                    </button>

                    <button
                        onClick={submit}
                        style={{
                            backgroundColor: '#2563eb',
                            color: 'white',
                            padding: '10px 15px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Submit
                    </button>
                </div>

                {submissionResult && (
                    <div style={{ marginTop: '15px', fontWeight: 'bold', color: '#2563eb' }}>
                        Passed {submissionResult.passedCount} out of {submissionResult.totalTestCases} test cases.
                    </div>
                )}

                {output && (
                    <pre
                        style={{
                            marginTop: '20px',
                            backgroundColor: '#f9fafb',
                            padding: '15px',
                            borderRadius: '6px',
                            whiteSpace: 'pre-wrap',
                            maxHeight: '200px',
                            overflowY: 'auto',
                            border: '1px solid #ddd',
                        }}
                    >
                        {output}
                    </pre>
                )}
            </div>
        </div>
    );
}
