import React, { useEffect, useState } from 'react'
import CodeEditor from './CodeEditor';
import { Editor } from '@monaco-editor/react';
import ThemeDropdown from './ThemeDropDown';
import { themes } from '../configs';
import Alert from './Alert';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Main = () => {
	const [loading, setLoading] = useState(false)
	const [value, setValue] = useState("");
	const [error, setError] = useState({ show: false, message: '' })
	const [testcases, setTestcases] = useState(null)
	const [copied, setCopied] = useState(false)
	const [theme, setTheme] = useState(themes[1]);

	const handleEditorChange = (value) => {
		setValue(value);
	};

	function handleEditorValidation(markers) {
		if (markers.length) {
			let errorMessages = [];
			markers.map(marker => errorMessages.push(`${marker.message} at line number ${marker.startLineNumber}`))
			setError({ ...error, message: errorMessages.join('\n') });
		} else {
			setError({ message: '', show: false })
		}
	}

	const submitCodeHandler = () => {
		if (error.message) {
			setError({ ...error, show: true })
			setTimeout(() => setError({ ...error, show: false }), 5000);
			return;
		} else {
			setError({ message: '', show: false })

			setLoading(true);
			fetch(API_BASE_URL + "/openai/generate-response", {
				headers: {
					'Content-type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({
					code: value
				})
			}).then(res => res.json())
				.then(res => {
					setLoading(false)
					setTestcases(res)
				})
				.catch(err => {
					setLoading(false)
					console.log(err)
				})
		}
	}


	return (
		<div className="container">
			<Alert message={error.message} show={error.show} variant='red' />
			<Alert message={'Code Copied!'} show={copied} />
			<h1 className='font-bold underline'>Generate Unit Test Cases</h1>
			<div className="mt-5 grid grid-cols-12 gap-2 border-t border-gray-200 pt-10">
				<CodeEditor onChange={handleEditorChange} code={value} onValidate={handleEditorValidation} theme={theme} />
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-1 rounded col-span-1" onClick={submitCodeHandler} disabled={loading}><span className='custom-btn'>{loading ? 'Loading....' : 'Generate Test Case'}</span></button>

				<Editor value={testcases ? testcases : 'Unit Test Case'} className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl col-span-5" width={'40rem'} theme={theme.value} />
			</div>
			<button className="bg-green-500 border-green-200 text-white font-bold py-2 px-1 rounded col-span-1 copy-btn" onClick={() => {
				navigator.clipboard.writeText(testcases);
				setCopied(true);
				setTimeout(() => setCopied(false), 5000)
			}}>Copy!</button>
			<ThemeDropdown handleThemeChange={selectedTheme => {
				setTheme(selectedTheme)
			}} theme={theme} />
		</div>
	)
}

export default Main