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
  return `${row},${col}`;
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

// !!!_NEW COMMIT_!!!
//преобразовать буквенные индексы в числовые
function colToIndex(col: string): number {
  let result = 0;
  for (let i = 0; i < col.length; i++) {
    result = result * 26 + (col.charCodeAt(i) - 64);
  }
  return result - 1;
}

//преобразовать число в буквенный индекс
function indexToCol(index: number): string {
  let result = '';
  let n = index;
  while (n >= 0) {
    result = String.fromCharCode((n % 26) + 65) + result;
    n = Math.floor(n / 26) - 1;
  }
  return result;
}

//парсинг ячейки в виде {row: 0, col: 0}
function parseCellRef(ref: string): CellPosition | null {
  const match = ref.match(/^([A-Z]+)(\d+)$/);
  if (!match) return null;

  return {
    row: parseInt(match[2]) - 1,
    col: colToIndex(match[1]),
  };
}

//парсинг диапазона в виде {start, end}
function parseRange(range: string): { start: CellPosition; end: CellPosition } | null {
  const parts = range.split(':');
  if (parts.length !== 2) return null;

  const start = parseCellRef(parts[0]);
  const end = parseCellRef(parts[1]);
  if (!start || !end) return null;

  return { start, end };
}

//получить числовое значение ячейки безопасно
function getNumericValue(data: SpreadsheetData, row: number, col: number): number {
  const cell = getCell(data, row, col);
  if (!cell || cell.value === null || cell.value === true || cell.value === false) return 0;
  const num = Number(cell.value);
  return isNaN(num) ? 0 : num;
}

//вычислить формулу
export function calcFormula(formula: string, data: SpreadsheetData): CellValue {
  formula = formula.trim();

  if (formula === '') return null;

  //проверка на число
  if (!isNaN(Number(formula)) && formula !== '') {
    return Number(formula);
  }

  //проверка на SUM/AVERAGЕ
  const sumMatch = formula.match(/^SUM\(([A-Z]+\d+):([A-Z]+\d+)\)$/i);
  if (sumMatch) {
    const range = parseRange(`${sumMatch[1]}:${sumMatch[2]}`);
    if (!range) return null;

    let total = 0;
    for (let r = range.start.row; r <= range.end.row; r++) {
      for (let c = range.start.col; c <= range.end.col; c++) {
        total += getNumericValue(data, r, c);
      }
    }
    return total;
  }

  const avgMatch = formula.match(/^AVERAGE\(([A-Z]+\d+):([A-Z]+\d+)\)$/i);
  if (avgMatch) {
    const range = parseRange(`${avgMatch[1]}:${avgMatch[2]}`);
    if (!range) return null;

    let total = 0;
    let count = 0;
    for (let r = range.start.row; r <= range.end.row; r++) {
      for (let c = range.start.col; c <= range.end.col; c++) {
        total += getNumericValue(data, r, c);
        count++;
      }
    }
    return count > 0 ? total / count : 0;
  }

  //проверка на простые операнды аримефтические
  const arithMatch = formula.match(/^(.+)([+\-*/])(.+)$/);
  if (arithMatch) {
    const left = calcFormula(arithMatch[1].trim(), data);
    const right = calcFormula(arithMatch[3].trim(), data);

    const leftNum = typeof left === 'number' ? left : getNumericValue(data, 0, 0);
    const rightNum = typeof right === 'number' ? right : getNumericValue(data, 0, 0);

    switch (arithMatch[2]) {
      case '+': return leftNum + rightNum;
      case '-': return leftNum - rightNum;
      case '*': return leftNum * rightNum;
      case '/': return rightNum !== 0 ? leftNum / rightNum : null;
    }
  }

  //проверка на ссылку на одну ячейку
  const cellRef = parseCellRef(formula);
  if (cellRef) {
    const cell = getCell(data, cellRef.row, cellRef.col);
    return cell ? cell.value : null;
  }

  //вернуть строку
  return formula;
}