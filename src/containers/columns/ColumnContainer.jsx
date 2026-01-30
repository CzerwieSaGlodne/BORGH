import { useState, useRef, useEffect } from 'react';
import './columns.css';

function Column({ column, index, updateColumn }) {
  const { title } = column;
  const [titleValue, setTitleValue] = useState(title);
  // const [editable, setEditable] = useState(false);
  const setTitle = () => {
    updateColumn({ ...column, title: titleValue }, index);
  };

  const inputRef = useRef(null);

  const focusAndSelect = () => {
    inputRef.current.focus();
    inputRef.current.select();
  };
  return (
    <div className='column'>
      <input
        ref={inputRef}
        value={titleValue}
        onClick={() => focusAndSelect()}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setTitle();
          }
        }}
        onBlur={setTitle}
        onChange={(e) => setTitleValue(e.target.value)}
      />
    </div>
  );
}

function ColumnContainer() {
  const [columns, setColumns] = useState([]);

  const updateColumn = (column, index) => {
    setColumns((prevColumns) => {
      const updated = [...prevColumns];
      updated[index] = column;
      console.log(updated);
      return updated;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button
        onClick={() => {
          setColumns((prevColumns) => [
            ...prevColumns,
            { title: 'Nowa kolumna' },
          ]);
        }}
      >
        Dodaj Kolumne +
      </button>
      <div
        className='column-container'
        style={{ width: `${columns.length * 200}px` }}
      >
        {columns.map((column, index) => (
          <Column
            key={column.title + index}
            column={column}
            index={index}
            updateColumn={updateColumn}
          />
        ))}
      </div>
    </div>
  );
}

export default ColumnContainer;
