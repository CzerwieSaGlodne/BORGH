import ColumnContainer from './containers/columns/ColumnsContainer';
import { ColumnsProvider } from './containers/columns/ColumnsContext';

function App() {
  return (
    <>
      <ColumnsProvider>
        <ColumnContainer />
      </ColumnsProvider>
    </>
  );
}

export default App;
