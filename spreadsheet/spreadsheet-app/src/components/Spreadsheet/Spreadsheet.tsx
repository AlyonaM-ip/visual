//импорт основных типов и функций из main
import { useState, useCallback } from 'react';
import {
  type SpreadsheetData,
  type CellPosition,
  createSpreadsheet,
  getCell,
  setCell,
  addRow,
  deleteRow,
  addColumn,
  deleteColumn,
} from '../../lib/spreadsheet-main';

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
  //размер по умолчанию
  const [data, setData] = useState<SpreadsheetData>(() =>
    createSpreadsheet(100, 26)
  );

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

  //блок таблицы
  return (
    <div>
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

      {/*таблица*/}
      <table>
        <thead>
          <tr>
            <th></th>
            {Array.from({ length: data.colCount }, (_, i) => (
              <th key={i} onContextMenu={(e) => onColContext(e, i)}>
                {colLabel(i)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: data.rowCount }, (_, row) => (
            <tr key={row}>
              <td onContextMenu={(e) => onRowContext(e, row)}>{row + 1}</td>
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