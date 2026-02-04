import { useState } from 'react';
import { useColumns } from './ColumnsContext';
import EditItemTitleDialog from './EditItemTitleDialog';

function Item({ item, columnIndex, index }) {
  const { title, done } = item;
  const { updateItem } = useColumns();
  const [isEditing, setIsEditing] = useState(false);

  const setDone = () => {
    updateItem({ ...item, done: !done }, columnIndex, index);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSave = (newTitle) => {
    updateItem({ ...item, title: newTitle }, columnIndex, index);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <input checked={done} type='checkbox' onChange={() => setDone()} />
      <div onDoubleClick={handleDoubleClick}>{title}</div>

      {isEditing && (
        <EditItemTitleDialog
          title={title}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default Item;
