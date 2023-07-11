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
			// if(!value.trim()) setError({ ...error, message: ''})
			setTimeout(() => setError({ ...error, show: false }), 5000);
			return;
		} else {
			setError({ message: '', show: false })
			setTestcases(null)

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
		<div>
			<Alert message={error.message} show={error.show} variant='red' />
			<Alert message={'Code Copied!'} show={copied} />
			<div className="w-screen flex border-t border-gray-200" style={{ height: '86.9vh' }}>
				<CodeEditor onChange={handleEditorChange} code={value} onValidate={handleEditorValidation} theme={theme} />
				<button className={`bg-${loading || !value.trim() ? 'zinc' : 'blue'}-500 hover:bg-${loading || !value.trim() ? 'zinc' : 'blue'}-700 text-white font-bold py-2 px-1 rounded`} onClick={submitCodeHandler} disabled={loading || !value.trim()}><span className='custom-btn'>{loading ? 'Loading....' : 'Generate Test Case'}</span></button>
				{
					loading ? <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
						<div
							className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
							role="status" style={{ position: 'relative', top: '40%' }}>
							<span
								className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
							>Loading...</span
							>
						</div>
					</div> : (

						<Editor language="javascript" value={testcases ? testcases : "// See your output here..."} className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl" height={'86.5vh'} theme={theme.value} defaultValue="// See your output here..."/>

					)
				}
			</div>
			<button className="bg-blue-300 border border-green-400 text-white pill font-bold py-2 px-1 rounded col-span-1 copy-btn" onClick={() => {
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