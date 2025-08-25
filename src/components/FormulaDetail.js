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
    <div>
      <h2>{formula.name}</h2>
      <p><strong>Category:</strong> {formula.category}</p>
      <p><strong>Formula:</strong></p>
      <p style={{ fontSize: '1.5rem' }}>
        <code>{formula.formula}</code>
      </p>
      <p><strong>Explanation:</strong> {formula.explanation}</p>

      <h4>Variables:</h4>
      <ul>
        {formula.variables.map((v, index) => (
          <li key={index}><strong>{v.symbol}</strong>: {v.meaning}</li>
        ))}
      </ul>

      <h4>Example:</h4>
      <p><strong>Problem:</strong> {formula.example.problem}</p>
      <p><strong>Solution:</strong> {formula.example.solution}</p>
    </div>
  );
}

export default FormulaDetail;

