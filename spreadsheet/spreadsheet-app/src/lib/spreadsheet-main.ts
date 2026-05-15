export type CellValue = string | number | boolean | null;

//интерфейс ячейки
export interface Cell {
  value: CellValue;
  formula: string;
}

//интерфейс координат ячейки
export interface CellPosition {
  row: number;
  col: number;
}

//интерфейс таблицы
export interface SpreadsheetData {
  cells: Map<string, Cell>;
  rowCount: number;
  colCount: number;
}

//функция ключа из координат ячейки
export function cellKey(row: number, col: number): string {
  return ${row},${col};
}

//создание таблицы
export function createSpreadsheet(rows: number, cols: number): SpreadsheetData {
  return {
    cells: new Map(),
    rowCount: rows,
    colCount: cols,
  };
}

//безопасно получить ячейку
export function getCell(data: SpreadsheetData, row: number, col: number): Cell | null {
  return data.cells.get(cellKey(row, col)) ?? null;
}

//установить значение ячейки
export function setCell(
  data: SpreadsheetData,
  row: number,
  col: number,
  value: CellValue,
  formula: string = ''
): SpreadsheetData {
  const newCells = new Map(data.cells);

  if (value === null && formula === '') {
    newCells.delete(cellKey(row, col));
  } else {
    newCells.set(cellKey(row, col), { value, formula });
  }

  return {
    ...data,
    cells: newCells,
  };
}