import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  type Document,
  loadDocuments,
  createDocument,
  renameDocument,
  deleteDocument,
  duplicateDocument,
} from '../../lib/document-service';

export default function Dashboard() {
  const navigate = useNavigate();
  const [docs, setDocs] = useState<Document[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRows, setNewRows] = useState(100);
  const [newCols, setNewCols] = useState(26);

  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renamingName, setRenamingName] = useState('');

  const refresh = () => setDocs(loadDocuments());

  useEffect(() => {
    refresh();
  }, []);

  const handleCreate = () => {
    if (newName.trim() === '') return;
    createDocument(newName.trim(), newRows, newCols);
    setNewName('');
    setShowCreate(false);
    refresh();
  };

  const handleDelete = (id: string) => {
    if (confirm('Удалить документ?')) {
      deleteDocument(id);
      refresh();
    }
  };

  const handleDuplicate = (id: string) => {
    duplicateDocument(id);
    refresh();
  };

  const handleRenameStart = (doc: Document) => {
    setRenamingId(doc.id);
    setRenamingName(doc.name);
  };

  const handleRenameSave = (id: string) => {
    if (renamingName.trim() !== '') {
      renameDocument(id, renamingName.trim());
    }
    setRenamingId(null);
    refresh();
  };

  const handleOpen = (id: string) => {
    navigate('/documents/' + id);
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
          {renamingId === doc.id ? (
            <input
              value={renamingName}
              onChange={(e) => setRenamingName(e.target.value)}
              onBlur={() => handleRenameSave(doc.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRenameSave(doc.id);
                if (e.key === 'Escape') setRenamingId(null);
              }}
              autoFocus
            />
          ) : (
            <button onClick={() => handleOpen(doc.id)}>{doc.name}</button>
          )}
          <span>{doc.updatedAt.slice(0, 10)}</span>
          <button onClick={() => handleRenameStart(doc)}>Переименовать</button>
          <button onClick={() => handleDuplicate(doc.id)}>Дублировать</button>
          <button onClick={() => handleDelete(doc.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
}