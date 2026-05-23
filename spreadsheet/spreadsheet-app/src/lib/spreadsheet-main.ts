export type CellValue = string | number | boolean | null;

export interface Cell {
  value: CellValue;
  formula: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  align: 'left' | 'center' | 'right';
  textColor: string;
  bgColor: string;
}

export interface CellPosition {
  row: number;
  col: number;
}

export interface SpreadsheetData {
  cells: Map<string, Cell>;
  rowCount: number;
  colCount: number;
}

export function cellKey(row: number, col: number): string {
  return `${row},${col}`;
}

export function createSpreadsheet(rows: number, cols: number): SpreadsheetData {
  return {
    cells: new Map(),
    rowCount: rows,
    colCount: cols,
  };
}

export function getCell(data: SpreadsheetData, row: number, col: number): Cell | null {
  return data.cells.get(cellKey(row, col)) ?? null;
}

export function setCell(
  data: SpreadsheetData,
  row: number,
  col: number,
  input: string
): SpreadsheetData {
  const newCells = new Map(data.cells);
  const key = cellKey(row, col);

  if (input === '') {
    newCells.delete(key);
    return { ...data, cells: newCells };
  }

  const old = data.cells.get(key);
  const bold = old?.bold ?? false;
  const italic = old?.italic ?? false;
  const underline = old?.underline ?? false;
  const align = old?.align ?? 'left';
  const textColor = old?.textColor ?? '#000000';
  const bgColor = old?.bgColor ?? '#ffffff';

  if (input.startsWith('=')) {
    const formula = input.slice(1);
    const value = calcFormula(formula, data);
    newCells.set(key, { value, formula: input, bold, italic, underline, align, textColor, bgColor });
  } else {
    const num = Number(input);
    if (!isNaN(num) && input.trim() !== '') {
      newCells.set(key, { value: num, formula: '', bold, italic, underline, align, textColor, bgColor });
    } else if (input === 'true' || input === 'false') {
      newCells.set(key, { value: input === 'true', formula: '', bold, italic, underline, align, textColor, bgColor });
    } else {
      newCells.set(key, { value: input, formula: '', bold, italic, underline, align, textColor, bgColor });
    }
  }

  return { ...data, cells: newCells };
}

function colToIndex(col: string): number {
  let result = 0;
  for (let i = 0; i < col.length; i++) {
    result = result * 26 + (col.charCodeAt(i) - 64);
  }
  return result - 1;
}

export function indexToCol(index: number): string {
  let result = '';
  let n = index;
  while (n >= 0) {
    result = String.fromCharCode((n % 26) + 65) + result;
    n = Math.floor(n / 26) - 1;
  }
  return result;
}

function parseCellRef(ref: string): CellPosition | null {
  const match = ref.match(/^([A-Z]+)(\d+)$/);
  if (!match) return null;

  return {
    row: parseInt(match[2]) - 1,
    col: colToIndex(match[1]),
  };
}

function parseRange(range: string): { start: CellPosition; end: CellPosition } | null {
  const parts = range.split(':');
  if (parts.length !== 2) return null;

  const start = parseCellRef(parts[0]);
  const end = parseCellRef(parts[1]);
  if (!start || !end) return null;

  return { start, end };
}

function getNumericValue(data: SpreadsheetData, row: number, col: number): number {
  const cell = getCell(data, row, col);
  if (!cell || cell.value === null || cell.value === true || cell.value === false) return 0;
  const num = Number(cell.value);
  return isNaN(num) ? 0 : num;
}

export function calcFormula(formula: string, data: SpreadsheetData): CellValue {
  formula = formula.trim();

  if (formula === '') return null;

  if (!isNaN(Number(formula)) && formula !== '') {
    return Number(formula);
  }

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

  const cellRef = parseCellRef(formula);
  if (cellRef) {
    const cell = getCell(data, cellRef.row, cellRef.col);
    return cell ? cell.value : null;
  }

  return formula;
}

export function addRow(data: SpreadsheetData, afterIndex: number): SpreadsheetData {
  const newCells = new Map<string, Cell>();

  for (const [key, cell] of data.cells) {
    const [r, c] = key.split(',').map(Number);
    if (r > afterIndex) {
      newCells.set(cellKey(r + 1, c), cell);
    } else {
      newCells.set(key, cell);
    }
  }

  return {
    cells: newCells,
    rowCount: data.rowCount + 1,
    colCount: data.colCount,
  };
}

export function deleteRow(data: SpreadsheetData, index: number): SpreadsheetData {
  const newCells = new Map<string, Cell>();

  for (const [key, cell] of data.cells) {
    const [r, c] = key.split(',').map(Number);
    if (r < index) {
      newCells.set(key, cell);
    } else if (r > index) {
      newCells.set(cellKey(r - 1, c), cell);
    }
  }

  return {
    cells: newCells,
    rowCount: data.rowCount - 1,
    colCount: data.colCount,
  };
}

export function addColumn(data: SpreadsheetData, afterIndex: number): SpreadsheetData {
  const newCells = new Map<string, Cell>();

  for (const [key, cell] of data.cells) {
    const [r, c] = key.split(',').map(Number);
    if (c > afterIndex) {
      newCells.set(cellKey(r, c + 1), cell);
    } else {
      newCells.set(key, cell);
    }
  }

  return {
    cells: newCells,
    rowCount: data.rowCount,
    colCount: data.colCount + 1,
  };
}

export function deleteColumn(data: SpreadsheetData, index: number): SpreadsheetData {
  const newCells = new Map<string, Cell>();

  for (const [key, cell] of data.cells) {
    const [r, c] = key.split(',').map(Number);
    if (c < index) {
      newCells.set(key, cell);
    } else if (c > index) {
      newCells.set(cellKey(r, c - 1), cell);
    }
  }

  return {
    cells: newCells,
    rowCount: data.rowCount,
    colCount: data.colCount - 1,
  };
}

export function cellsToObject(data: SpreadsheetData): Record<string, { value: CellValue; formula: string; bold: boolean; italic: boolean; underline: boolean; align: 'left' | 'center' | 'right'; textColor: string; bgColor: string }> {
  const obj: Record<string, { value: CellValue; formula: string; bold: boolean; italic: boolean; underline: boolean; align: 'left' | 'center' | 'right'; textColor: string; bgColor: string }> = {};
  for (const [key, cell] of data.cells) {
    obj[key] = { value: cell.value, formula: cell.formula, bold: cell.bold, italic: cell.italic, underline: cell.underline, align: cell.align, textColor: cell.textColor, bgColor: cell.bgColor };
  }
  return obj;
}

export function objectToCells(obj: Record<string, { value: CellValue; formula: string; bold: boolean; italic: boolean; underline: boolean; align: 'left' | 'center' | 'right'; textColor: string; bgColor: string }>): Map<string, Cell> {
  const map = new Map<string, Cell>();
  for (const key in obj) {
    const item = obj[key];
    map.set(key, {
      value: item.value,
      formula: item.formula,
      bold: item.bold ?? false,
      italic: item.italic ?? false,
      underline: item.underline ?? false,
      align: item.align ?? 'left',
      textColor: item.textColor ?? '#000000',
      bgColor: item.bgColor ?? '#ffffff',
    });
  }
  return map;
}