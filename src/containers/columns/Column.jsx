import { useState, useRef } from 'react';
import { useColumns } from './ColumnsContext';
import ColorPicker from '../../components/ColorPicker';
import Item from './Item';

function Column({ column, index }) {
  const { title, backgroundColor, items } = column;
  const [titleValue, setTitleValue] = useState(title);
  const { updateColumn } = useColumns();

  const inputRef = useRef(null);

  const setTitle = () => {
    updateColumn({ ...column, title: titleValue }, index);
  };

  const handleColorChange = (color) => {
    updateColumn({ ...column, backgroundColor: color }, index);
  };

  const addItem = () => {
    console.log(column);
    updateColumn(
      {
        ...column,
        items: [...items, { title: 'nowy item', done: false }],
      },
      index,
    );
  };

  const focusAndSelect = () => {
    inputRef.current.focus();
    inputRef.current.select();
  };

  return (
    <div className='column' style={{ backgroundColor }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          ref={inputRef}
          value={titleValue}
          onClick={() => focusAndSelect()}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setTitle();
            }
          }}
          onBlur={() => setTitle()}
          onChange={(e) => setTitleValue(e.target.value)}
        />

        <ColorPicker
          currentColor={backgroundColor}
          onColorChange={handleColorChange}
        />
      </div>
      {items.map((item, itemIndex) => (
        <Item
          key={`${item.title}-${itemIndex}`}
          item={item}
          index={itemIndex}
          columnIndex={index}
        />
      ))}
      <button onClick={() => addItem()}>Dodaj item</button>
    </div>
  );
}

export default Column;
