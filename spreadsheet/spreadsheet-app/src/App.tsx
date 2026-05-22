import { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Spreadsheet from './components/Spreadsheet/Spreadsheet';

export default function App() {
  const [activeDoc, setActiveDoc] = useState<string | null>(null);

  if (activeDoc) {
    return (
      <div>
        <button onClick={() => setActiveDoc(null)}>Назад к списку</button>
        <Spreadsheet docId={activeDoc} />
      </div>
    );
  }

  return <Dashboard onOpen={(id) => setActiveDoc(id)} />;
}