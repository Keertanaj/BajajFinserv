import React, { useState } from 'react';

function App() {
    const [inputData, setInputData] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://<your_backend_url>/bfhl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: JSON.parse(inputData) }),
            });
            const data = await response.json();
            setResponseData(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleOptionChange = (e) => {
        const { value, checked } = e.target;
        setSelectedOptions(prev => checked ? [...prev, value] : prev.filter(v => v !== value));
    };

    const renderResponse = () => {
        if (!responseData) return null;
        return (
            <div>
                {selectedOptions.includes('Alphabets') && <p>Alphabets: {responseData.alphabets.join(', ')}</p>}
                {selectedOptions.includes('Numbers') && <p>Numbers: {responseData.numbers.join(', ')}</p>}
                {selectedOptions.includes('Highest lowercase alphabet') && <p>Highest Lowercase Alphabet: {responseData.highest_lowercase_alphabet.join(', ')}</p>}
            </div>
        );
    };

    return (
        <div className="App">
            <h1>{responseData ? responseData.roll_number : "Your Roll Number"}</h1>
            <form onSubmit={handleSubmit}>
                <textarea value={inputData} onChange={(e) => setInputData(e.target.value)} placeholder="Enter JSON here" />
                <button type="submit">Submit</button>
            </form>

            <div>
                <label>
                    <input type="checkbox" value="Alphabets" onChange={handleOptionChange} />
                    Alphabets
                </label>
                <label>
                    <input type="checkbox" value="Numbers" onChange={handleOptionChange} />
                    Numbers
                </label>
                <label>
                    <input type="checkbox" value="Highest lowercase alphabet" onChange={handleOptionChange} />
                    Highest lowercase alphabet
                </label>
            </div>

            {renderResponse()}
        </div>
    );
}

export default App;
