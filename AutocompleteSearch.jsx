import { useEffect, useState } from 'react';

export default function AutocompleteSearch({ setSearchParams }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);

  useEffect(() => {
    fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json')
      .then(res => res.json())
      .then(data => setAllDoctors(data));
  }, []);

  useEffect(() => {
    if (input.trim()) {
      const matches = allDoctors
        .filter(d => d.name.toLowerCase().includes(input.toLowerCase()))
        .slice(0, 3);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const handleSearch = (name = input) => {
    setSearchParams(params => {
      params.set('q', name);
      return params;
    });
    setInput('');
    setSuggestions([]);
  };

  return (
    <div>
      <input
        data-testid="autocomplete-input"
        type="text"
        className="border p-2 w-full"
        placeholder="Search doctor name..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSearch()}
      />
      <div className="bg-white border rounded">
        {suggestions.map(s => (
          <div
            key={s.id}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            data-testid="suggestion-item"
            onClick={() => handleSearch(s.name)}
          >
            {s.name}
          </div>
        ))}
      </div>
    </div>
  );
}
