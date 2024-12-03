import { useState } from 'react';

function ProfessionSelectionModal({ onSelectProfession }) {
  const [profession, setProfession] = useState('');

  const professions = ['Lawyer', 'Nurse', 'Plumber', 'IT Technician', 'Administrator'];

  return (
    <div className="modal">
      <h2>Select Profession</h2>
      <select value={profession} onChange={(e) => setProfession(e.target.value)}>
        <option value="">Select Profession</option>
        {professions.map((prof, index) => (
          <option key={index} value={prof}>
            {prof}
          </option>
        ))}
      </select>
      <button onClick={() => onSelectProfession(profession)}>Confirm</button>
    </div>
  );
}

export default ProfessionSelectionModal;
