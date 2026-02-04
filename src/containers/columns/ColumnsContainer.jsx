import { useState } from 'react';
import './columns.css';
import Column from './Column';
import { useColumns } from './ColumnsContext';

function ColumnContainer() {
  const { columns, addColumn, clearColumns } = useColumns();
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button
        onClick={() => {
          clearColumns();
        }}
      >
        Clear
      </button>
      <button
        onClick={() => {
          addColumn();
        }}
      >
        Dodaj Kolumne +
      </button>
      <div
        className='column-container'
        style={{ width: `${columns.length * 250}px` }}
      >
        {columns.map((column, index) => (
          <Column key={column.title + index} column={column} index={index} />
        ))}
      </div>
    </div>
  );
}

export default ColumnContainer;
