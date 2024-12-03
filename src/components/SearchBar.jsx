import { TextField, Button } from '@mui/material';
import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <TextField
        variant="outlined"
        placeholder="Search for professionals..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ width: '60%' }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch} sx={{ ml: 2 }}>
        Search
      </Button>
    </div>
  );
}

export default SearchBar;
