import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import formulas from '../data/formulas.json';

function FormulaList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFormulas, setFilteredFormulas] = useState(formulas);

  useEffect(() => {
    const results = formulas.filter((f) =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFormulas(results);
  }, [searchTerm]);

  return (
    <div className="formula-list">
      <h1>Math Formulas</h1>
      <SearchBar onSearch={setSearchTerm} />
      <ul>
        {filteredFormulas.map((formula) => (
          <li key={formula.id}>
            <Link to={`/formula/${formula.id}`}>
              <strong>{formula.name}</strong> — {formula.category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FormulaList;

