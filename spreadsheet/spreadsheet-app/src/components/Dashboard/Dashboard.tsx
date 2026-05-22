import { useState, useEffect } from 'react';
import {
  type Document,
  loadDocuments,
  createDocument,
  renameDocument,
  deleteDocument,
  duplicateDocument,
} from '../../lib/document-service';

interface DashboardProps {
  onOpen: (id: string) => void;
}

export default function Dashboard({ onOpen }: DashboardProps) {
  const [docs, setDocs] = useState<Document[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRows, setNewRows] = useState(100);
  const [newCols, setNewCols] = useState(26);

  //обновить список
  const refresh = () => setDocs(loadDocuments());

  useEffect(() => {
    refresh();
  }, []);

  //создать документ
  const handleCreate = () => {
    if (newName.trim() === '') return;
    createDocument(newName.trim(), newRows, newCols);
    setNewName('');
    setShowCreate(false);
    refresh();
  };

  //удалить документ
  const handleDelete = (id: string) => {
    if (confirm('Удалить документ?')) {
      deleteDocument(id);
      refresh();
    }
  };

  //дублировать документ
  const handleDuplicate = (id: string) => {
    duplicateDocument(id);
    refresh();
  };

  //переименовать документ
  const handleRename = (id: string) => {
    const name = prompt('Новое название:');
    if (name && name.trim() !== '') {
      renameDocument(id, name.trim());
      refresh();
    }
  };

return (
    <div>
      <h2>Мои документы</h2>

      <button onClick={() => setShowCreate(!showCreate)}>
        {showCreate ? 'Отмена' : 'Создать документ'}
      </button>

      {showCreate && (
        <div>
          <input
            placeholder="Название"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Строки"
            value={newRows}
            onChange={(e) => setNewRows(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Столбцы"
            value={newCols}
            onChange={(e) => setNewCols(Number(e.target.value))}
          />
          <button onClick={handleCreate}>Создать</button>
        </div>
      )}

      {docs.length === 0 && <p>Нет документов</p>}

      {docs.map((doc) => (
        <div key={doc.id}>
          <span onClick={() => onOpen(doc.id)}>{doc.name}</span>
          <span>{doc.updatedAt.slice(0, 10)}</span>
          <button onClick={() => handleRename(doc.id)}>Переименовать</button>
          <button onClick={() => handleDuplicate(doc.id)}>Дублировать</button>
          <button onClick={() => handleDelete(doc.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
}