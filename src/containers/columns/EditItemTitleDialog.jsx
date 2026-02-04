import { useState } from 'react';

function EditItemTitleDialog({ title, onSave, onCancel }) {
  const [editedTitle, setEditedTitle] = useState(title);

  const handleSave = () => {
    onSave(editedTitle);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') onCancel();
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        backgroundColor: '#8764B8',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        zIndex: 1000,
        minWidth: '200px',
      }}
    >
      <input
        type='text'
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        autoFocus
        style={{ width: '100%', marginBottom: '8px', padding: '4px' }}
        onKeyDown={handleKeyDown}
      />
      <div style={{ display: 'flex', gap: '4px' }}>
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default EditItemTitleDialog;
