import { describe, it, expect } from 'vitest';
import {
  createSpreadsheet,
  setCell,
  getCell,
  calcFormula,
  addRow,
  deleteRow,
  addColumn,
  deleteColumn,
  cellsToObject,
  objectToCells,
} from './spreadsheet-main';

describe('spreadsheet-main', () => {
  it('создаёт пустую таблицу', () => {
    const data = createSpreadsheet(10, 5);
    expect(data.rowCount).toBe(10);
    expect(data.colCount).toBe(5);
    expect(data.cells.size).toBe(0);
  });

  it('устанавливает и получает значение ячейки', () => {
    let data = createSpreadsheet(10, 5);
    data = setCell(data, 0, 0, 'привет');
    const cell = getCell(data, 0, 0);
    expect(cell?.value).toBe('привет');
  });

  it('определяет число', () => {
    let data = createSpreadsheet(10, 5);
    data = setCell(data, 0, 0, '42');
    expect(getCell(data, 0, 0)?.value).toBe(42);
  });

  it('определяет булево', () => {
    let data = createSpreadsheet(10, 5);
    data = setCell(data, 0, 0, 'true');
    expect(getCell(data, 0, 0)?.value).toBe(true);
  });

  it('удаляет ячейку при пустом вводе', () => {
    let data = createSpreadsheet(10, 5);
    data = setCell(data, 0, 0, 'текст');
    data = setCell(data, 0, 0, '');
    expect(getCell(data, 0, 0)).toBeNull();
  });

  it('SUM вычисляет сумму', () => {
    let data = createSpreadsheet(10, 5);
    data = setCell(data, 0, 0, '5');
    data = setCell(data, 1, 0, '10');
    data = setCell(data, 2, 0, '15');
    const result = calcFormula('SUM(A1:A3)', data);
    expect(result).toBe(30);
  });

  it('AVERAGE вычисляет среднее', () => {
    let data = createSpreadsheet(10, 5);
    data = setCell(data, 0, 0, '10');
    data = setCell(data, 1, 0, '20');
    const result = calcFormula('AVERAGE(A1:A2)', data);
    expect(result).toBe(15);
  });

  it('арифметика через ссылки', () => {
    let data = createSpreadsheet(10, 5);
    data = setCell(data, 0, 0, '10');
    data = setCell(data, 0, 1, '5');
    const result = calcFormula('A1+B1', data);
    expect(result).toBe(15);
  });

  it('арифметика напрямую', () => {
    const data = createSpreadsheet(10, 5);
    const result = calcFormula('3*4', data);
    expect(result).toBe(12);
  });

  it('добавляет строку', () => {
    let data = createSpreadsheet(10, 5);
    data = setCell(data, 5, 0, 'текст');
    data = addRow(data, 2);
    expect(data.rowCount).toBe(11);
    expect(getCell(data, 6, 0)?.value).toBe('текст');
  });

  it('удаляет строку', () => {
    let data = createSpreadsheet(10, 5);
    data = setCell(data, 5, 0, 'текст');
    data = deleteRow(data, 2);
    expect(data.rowCount).toBe(9);
    expect(getCell(data, 4, 0)?.value).toBe('текст');
  });

  it('добавляет колонку', () => {
    let data = createSpreadsheet(10, 5);
    data = setCell(data, 0, 3, 'текст');
    data = addColumn(data, 1);
    expect(data.colCount).toBe(6);
    expect(getCell(data, 0, 4)?.value).toBe('текст');
  });

  it('удаляет колонку', () => {
    let data = createSpreadsheet(10, 5);
    data = setCell(data, 0, 3, 'текст');
    data = deleteColumn(data, 1);
    expect(data.colCount).toBe(4);
    expect(getCell(data, 0, 2)?.value).toBe('текст');
  });

  it('сохраняет и загружает ячейки', () => {
    let data = createSpreadsheet(10, 5);
    data = setCell(data, 0, 0, 'тест');
    const obj = cellsToObject(data);
    const map = objectToCells(obj);
    expect(map.get('0,0')?.value).toBe('тест');
  });
});