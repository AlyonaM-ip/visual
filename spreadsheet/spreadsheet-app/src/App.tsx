import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store';
import { setActive } from './store/documentsSlice';
import Dashboard from './components/Dashboard/Dashboard';
import Spreadsheet from './components/Spreadsheet/Spreadsheet';

export default function App() {
  const activeId = useSelector((state: RootState) => state.documents.activeId);
  const dispatch = useDispatch();

  if (activeId) {
    return (
      <div>
        <button onClick={() => dispatch(setActive(null))}>Назад к списку</button>
        <Spreadsheet docId={activeId} />
      </div>
    );
  }

  return <Dashboard />;
}