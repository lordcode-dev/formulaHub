import React from 'react';
import { useParams } from 'react-router-dom';
import formulas from '../data/formulas.json';

function FormulaDetail() {
  const { id } = useParams();
  const formula = formulas.find((f) => f.id === id);

  if (!formula) {
    return <p>Formula not found.</p>;
  }

  return (
    <div className="formula-detail">
      <h2>{formula.name}</h2>
      <p><strong>Category:</strong> {formula.category}</p>
      <p><strong>Formula:</strong></p>
      <pre style={{ fontSize: '1.3rem', backgroundColor: '#f0f0f0', padding: '0.5rem' }}>
        {formula.formula}
      </pre>
      <p><strong>Explanation:</strong> {formula.explanation}</p>

      {formula.variables && (
        <>
          <h4>Variables:</h4>
          <ul>
            {formula.variables.map((v, i) => (
              <li key={i}><strong>{v.symbol}</strong>: {v.meaning}</li>
            ))}
          </ul>
        </>
      )}

      {formula.example && (
        <>
          <h4>Example:</h4>
          <p><strong>Problem:</strong> {formula.example.problem}</p>
          <p><strong>Solution:</strong> {formula.example.solution}</p>
        </>
      )}
    </div>
  );
}

export default FormulaDetail;
