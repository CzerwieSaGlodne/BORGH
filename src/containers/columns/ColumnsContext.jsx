import { createContext, useContext, useState, useEffect } from 'react';

const COLUMNS_LOCAL_STORAGE_KEY = 'columns';

const ColumnsContext = createContext();

export function useColumns() {
  const context = useContext(ColumnsContext);

  if (context === undefined) {
    throw new Error('useColumns must be used within a ColumnsProvider');
  }

  return context;
}

export function ColumnsProvider({ children }) {
  const [columns, setColumns] = useState(() => {
    // Initialize from localStorage if available
    const saved = localStorage.getItem(COLUMNS_LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(COLUMNS_LOCAL_STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const updateColumn = (updatedColumn, index) => {
    setColumns((prevColumns) => {
      const updated = [...prevColumns];
      updated[index] = updatedColumn;
      return updated;
    });
  };

  const updateItem = (updatedItem, columnIndex, itemIndex) => {
    setColumns((prevColumns) => {
      const updated = [...prevColumns];
      updated[columnIndex].items[itemIndex] = updatedItem;
      return updated;
    });
  };

  const addColumn = () => {
    setColumns((prevColumns) => [
      ...prevColumns,
      { title: 'Nowa kolumna', backgroundColor: '#000000', items: [] },
    ]);
  };

  const clearColumns = () => {
    setColumns([]);
  };

  const value = {
    columns,
    updateColumn,
    addColumn,
    clearColumns,
    updateItem,
  };

  return (
    <ColumnsContext.Provider value={value}>{children}</ColumnsContext.Provider>
  );
}
