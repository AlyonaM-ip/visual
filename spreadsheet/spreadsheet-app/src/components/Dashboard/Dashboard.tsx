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