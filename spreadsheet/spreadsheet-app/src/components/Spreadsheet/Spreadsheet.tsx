//импорт основных типов и функций из main
import { useState, useCallback } from 'react';
import {
  type SpreadsheetData,
  type CellPosition,
  createSpreadsheet,
  getCell,
  setCell,
} from '../../lib/spreadsheet-main';

//преобравзовать число в букву
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

  //блок таблицы
  return (
    <div>
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

      <div>
        {colLabel(selected.col)}{selected.row + 1}
      </div>
    </div>
  );
}