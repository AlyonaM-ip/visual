//импорт основных типов и функций из main
import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  type SpreadsheetData,
  type CellPosition,
  getCell,
  setCell,
  addRow,
  deleteRow,
  addColumn,
  deleteColumn,
  cellsToObject,
  objectToCells,
} from '../../lib/spreadsheet-main';
import { saveCells, loadCells } from '../../lib/document-service';

//преобразовать число в букву колонки
function colLabel(index: number): string {
  let result = '';
  let n = index;
  while (n >= 0) {
    result = String.fromCharCode((n % 26) + 65) + result;
    n = Math.floor(n / 26) - 1;
  }
  return result;
}

//таблица
export default function Spreadsheet() {
  const { id } = useParams<{ id: string }>();
  const docId = id || '';

  //размер по умолчанию
  const [data, setData] = useState<SpreadsheetData>(() => {
    const saved = loadCells(docId);
    const cells = objectToCells(saved);
    return {
      cells,
      rowCount: 100,
      colCount: 26,
    };
  });

  //режимы ячеек/редактор
  const [selected, setSelected] = useState<CellPosition>({ row: 0, col: 0 });
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  //всплывающее меню
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    type: 'row' | 'col';
    index: number;
  } | null>(null);

  //размеры колонок и строк
  const [colWidths, setColWidths] = useState<number[]>(() =>
    Array(26).fill(80)
  );
  const [rowHeights, setRowHeights] = useState<number[]>(() =>
    Array(100).fill(24)
  );

  //перетаскивание границы
  const [resizing, setResizing] = useState<{
    type: 'col' | 'row';
    index: number;
    startX: number;
    startY: number;
    startSize: number;
  } | null>(null);

  //получить значение ячейки
  const displayValue = useCallback(
    (row: number, col: number): string => {
      const cell = getCell(data, row, col);
      if (!cell || cell.value === null) return '';
      if (typeof cell.value === 'boolean') return cell.value ? 'TRUE' : 'FALSE';
      return String(cell.value);
    },
    [data]
  );

  //получить формулу ячейки
  const formulaValue = useCallback(
    (row: number, col: number): string => {
      const cell = getCell(data, row, col);
      return cell?.formula ?? displayValue(row, col);
    },
    [data, displayValue]
  );

  //старт редактирования
  const startEdit = useCallback(() => {
    setEditValue(formulaValue(selected.row, selected.col));
    setEditing(true);
  }, [selected, formulaValue]);

  //завершить редактирование
  const commitEdit = useCallback(() => {
    if (editing) {
      setData((prev) => setCell(prev, selected.row, selected.col, editValue));
      setEditing(false);
    }
  }, [editing, selected, editValue]);

  //открыть контекстное меню на заголовке строки
  const onRowContext = useCallback((e: React.MouseEvent, row: number) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, type: 'row', index: row });
  }, []);

  //открыть контекстное меню на заголовке колонки
  const onColContext = useCallback((e: React.MouseEvent, col: number) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, type: 'col', index: col });
  }, []);

  //закрыть меню
  const closeMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  //добавить строку
  const handleAddRow = useCallback(() => {
    if (contextMenu) {
      setData((prev) => addRow(prev, contextMenu.index));
      closeMenu();
    }
  }, [contextMenu, closeMenu]);

  //удалить строку
  const handleDeleteRow = useCallback(() => {
    if (contextMenu && data.rowCount > 1) {
      setData((prev) => deleteRow(prev, contextMenu.index));
      closeMenu();
    }
  }, [contextMenu, data.rowCount, closeMenu]);

  //добавить колонку
  const handleAddColumn = useCallback(() => {
    if (contextMenu) {
      setData((prev) => addColumn(prev, contextMenu.index));
      closeMenu();
    }
  }, [contextMenu, closeMenu]);

  //удалить колонку
  const handleDeleteColumn = useCallback(() => {
    if (contextMenu && data.colCount > 1) {
      setData((prev) => deleteColumn(prev, contextMenu.index));
      closeMenu();
    }
  }, [contextMenu, data.colCount, closeMenu]);

  //начать ресайз колонки
  const onColResizeStart = useCallback(
    (e: React.MouseEvent, col: number) => {
      e.preventDefault();
      setResizing({
        type: 'col',
        index: col,
        startX: e.clientX,
        startY: e.clientY,
        startSize: colWidths[col],
      });
    },
    [colWidths]
  );

  //начать ресайз строки
  const onRowResizeStart = useCallback(
    (e: React.MouseEvent, row: number) => {
      e.preventDefault();
      setResizing({
        type: 'row',
        index: row,
        startX: e.clientX,
        startY: e.clientY,
        startSize: rowHeights[row],
      });
    },
    [rowHeights]
  );

  //движение мыши при ресайзе
  const onResizeMove = useCallback(
    (e: React.MouseEvent) => {
      if (!resizing) return;

      if (resizing.type === 'col') {
        const delta = e.clientX - resizing.startX;
        const newWidth = Math.max(40, resizing.startSize + delta);
        setColWidths((prev) => {
          const next = [...prev];
          next[resizing.index] = newWidth;
          return next;
        });
      } else {
        const delta = e.clientY - resizing.startY;
        const newHeight = Math.max(20, resizing.startSize + delta);
        setRowHeights((prev) => {
          const next = [...prev];
          next[resizing.index] = newHeight;
          return next;
        });
      }
    },
    [resizing]
  );

  //закончить ресайз
  const onResizeEnd = useCallback(() => {
    setResizing(null);
  }, []);

  //автосохранение при изменении data
  useEffect(() => {
    const obj = cellsToObject(data);
    saveCells(docId, obj);
  }, [data, docId]);

  //горячие клавиши
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ctrl+S — сохранить
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        const obj = cellsToObject(data);
        saveCells(docId, obj);
        alert('Сохранено');
      }
      // Del / Backspace — очистить ячейку
      if ((e.key === 'Delete' || e.key === 'Backspace') && !editing) {
        e.preventDefault();
        setData((prev) => setCell(prev, selected.row, selected.col, ''));
      }
      // Tab — следующая ячейка
      if (e.key === 'Tab' && !editing) {
        e.preventDefault();
        const nextCol = selected.col + 1;
        if (nextCol < data.colCount) {
          setSelected({ row: selected.row, col: nextCol });
        } else {
          const nextRow = selected.row + 1;
          if (nextRow < data.rowCount) {
            setSelected({ row: nextRow, col: 0 });
          }
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [data, docId, selected, editing]);

  //экспорт в CSV
  const exportCSV = () => {
    let csv = '';
    for (let r = 0; r < data.rowCount; r++) {
      const row: string[] = [];
      for (let c = 0; c < data.colCount; c++) {
        const cell = getCell(data, r, c);
        const val = cell?.value ?? '';
        row.push(String(val));
      }
      csv += row.join(',') + '\n';
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  //экспорт в JSON
  const exportJSON = () => {
    const obj = cellsToObject(data);
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  //блок таблицы
  return (
    <div onMouseMove={onResizeMove} onMouseUp={onResizeEnd} onMouseLeave={onResizeEnd}>
      {/*панель формул*/}
      <div>
        <input
          value={editing ? editValue : formulaValue(selected.row, selected.col)}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (editing) {
                commitEdit();
              } else {
                startEdit();
              }
            }
            if (e.key === 'Escape' && editing) {
              setEditing(false);
            }
          }}
          onFocus={() => {
            if (!editing) startEdit();
          }}
        />
      </div>

      {/*адрес ячейки*/}
      <div>
        {colLabel(selected.col)}{selected.row + 1}
      </div>

      {/*кнопки*/}
      <div>
        <button onClick={() => window.history.back()}>Назад</button>
        <button onClick={exportCSV}>Экспорт CSV</button>
        <button onClick={exportJSON}>Экспорт JSON</button>
      </div>

      {/*таблица*/}
      <table>
        <thead>
          <tr>
            <th></th>
            {Array.from({ length: data.colCount }, (_, i) => (
              <th
                key={i}
                onContextMenu={(e) => onColContext(e, i)}
                style={{ width: colWidths[i], position: 'relative' }}
              >
                {colLabel(i)}
                <div
                  onMouseDown={(e) => onColResizeStart(e, i)}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    cursor: 'col-resize',
                  }}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: data.rowCount }, (_, row) => (
            <tr key={row} style={{ height: rowHeights[row] }}>
              <td
                onContextMenu={(e) => onRowContext(e, row)}
                style={{ position: 'relative' }}
              >
                {row + 1}
                <div
                  onMouseDown={(e) => onRowResizeStart(e, row)}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    cursor: 'row-resize',
                  }}
                />
              </td>
              {Array.from({ length: data.colCount }, (_, col) => (
                <td
                  key={col}
                  onClick={() => {
                    setSelected({ row, col });
                    setEditing(false);
                  }}
                  onDoubleClick={() => {
                    setSelected({ row, col });
                    startEdit();
                  }}
                >
                  {displayValue(row, col)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/*контекстное меню*/}
      {contextMenu && (
        <div style={{ position: 'fixed', top: contextMenu.y, left: contextMenu.x }}>
          {contextMenu.type === 'row' ? (
            <>
              <button onClick={handleAddRow}>Добавить строку</button>
              <button onClick={handleDeleteRow} disabled={data.rowCount <= 1}>Удалить строку</button>
            </>
          ) : (
            <>
              <button onClick={handleAddColumn}>Добавить столбец</button>
              <button onClick={handleDeleteColumn} disabled={data.colCount <= 1}>Удалить столбец</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}