import { useState, useRef, useEffect } from 'react';

function ColorPicker({ currentColor, onColorChange }) {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  const colors = [
    '#ffffff',
    '#f3f4f6',
    '#e5e7eb',
    '#d1d5db',
    '#fef3c7',
    '#fde68a',
    '#fcd34d',
    '#fbbf24',
    '#fed7aa',
    '#fdba74',
    '#fb923c',
    '#f97316',
    '#fecaca',
    '#fca5a5',
    '#f87171',
    '#ef4444',
    '#ddd6fe',
    '#c4b5fd',
    '#a78bfa',
    '#8b5cf6',
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPicker]);

  const handleColorSelect = (color) => {
    onColorChange(color);
    setShowPicker(false);
  };

  return (
    <div ref={pickerRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setShowPicker(!showPicker)}
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '4px',
          border: '2px solid #ddd',
          backgroundColor: currentColor,
          cursor: 'pointer',
          padding: 0,
        }}
        aria-label='Choose background color'
      />

      {showPicker && (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            marginTop: '4px',
            padding: '8px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '6px',
          }}
        >
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorSelect(color)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '4px',
                border:
                  currentColor === color
                    ? '3px solid #3b82f6'
                    : '2px solid #ddd',
                backgroundColor: color,
                cursor: 'pointer',
                padding: 0,
              }}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
