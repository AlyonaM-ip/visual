import { describe, it, expect, afterEach } from 'vitest';
import { formatCSVFileToJSONFile } from '../tc/lab3';
import * as fs from 'fs';

describe('formatCSVFileToJSONFile с ручными заглушками', () => {
    // Сохраняем оригинальные функции
    const originalReadFile = fs.promises.readFile;
    const originalWriteFile = fs.promises.writeFile;

    // Ручные заглушки
    let readFileCalled = false;
    let writeFileCalled = false;
    let readFilePath = '';
    let writeFilePath = '';
    let writeFileContent = '';
    let writeFileEncoding = '';

    // Восстанавливаем оригинальные функции после каждого теста
    afterEach(() => {
        fs.promises.readFile = originalReadFile;
        fs.promises.writeFile = originalWriteFile;
    });

    const mockReadFile = async (path: string, encoding: string) => {
        readFileCalled = true;
        readFilePath = path;
        return 'name,age,city\nDmitriy,20,Novosibirsk\nAlyona,22,Novosibirsk\nAlexander,15,Severobaikalsk';
    };

    const mockWriteFile = async (path: string, content: string, encoding: string) => {
        writeFileCalled = true;
        writeFilePath = path;
        writeFileContent = content;
        writeFileEncoding = encoding;
    };

    it('должен вызвать readFile и writeFile с правильными параметрами', async () => {
        // Подменяем функции на заглушки
        fs.promises.readFile = mockReadFile as any;
        fs.promises.writeFile = mockWriteFile as any;

        // Вызываем тестируемую функцию
        await formatCSVFileToJSONFile('../tc/data.csv', '../tc/output.json', ',');

        // Проверяем что readFile вызван
        expect(readFileCalled).toBe(true);
        expect(readFilePath).toBe('../tc/data.csv');

        // Проверяем что writeFile вызван
        expect(writeFileCalled).toBe(true);
        expect(writeFilePath).toBe('../tc/output.json');
        expect(writeFileEncoding).toBe('utf-8');

        const parsed = JSON.parse(writeFileContent);
        expect(parsed).toHaveLength(3);
        expect(parsed).toEqual([
            { name: 'Dmitriy', age: 20, city: 'Novosibirsk' },
            { name: 'Alyona', age: 22, city: 'Novosibirsk' },
            { name: 'Alexander', age: 15, city: 'Severobaikalsk' }
        ]);
    });

    it('должен работать с реальными данными из ../tc/data.csv (все 3 строки)', async () => {
        fs.promises.readFile = mockReadFile as any;
        fs.promises.writeFile = mockWriteFile as any;

        await formatCSVFileToJSONFile('../tc/data.csv', '../tc/output.json', ',');

        const parsed = JSON.parse(writeFileContent);
        
        expect(parsed).toHaveLength(3);
        expect(parsed[0].name).toBe('Dmitriy');
        expect(parsed[1].name).toBe('Alyona');
        expect(parsed[2].name).toBe('Alexander');
        
    });

    it('должен вызывать writeFile ТОЛЬКО после успешного readFile', async () => {
        // Сброс флагов
        readFileCalled = false;
        writeFileCalled = false;

        // Заглушка readFile с ошибкой
        const mockReadFileWithError = async (path: string, encoding: string) => {
            readFileCalled = true;
            throw new Error('Файл не найден');
        };

        fs.promises.readFile = mockReadFileWithError as any;
        fs.promises.writeFile = mockWriteFile as any;

        try {
            await formatCSVFileToJSONFile('../tc/data.csv', '../tc/output.json', ',');
        } catch (error) {
            expect((error as Error).message).toContain('Файл не найден');
        }

        expect(readFileCalled).toBe(true);
        expect(writeFileCalled).toBe(false);
    });

    // проверка на типы 
    it('должен правильно определять типы данных (числа/строки)', async () => {
        fs.promises.readFile = mockReadFile as any;
        fs.promises.writeFile = mockWriteFile as any;

        await formatCSVFileToJSONFile('../tc/data.csv', '../tc/output.json', ',');
        const parsed = JSON.parse(writeFileContent);
        
        expect(typeof parsed[0].age).toBe('number');
        expect(typeof parsed[1].age).toBe('number');
        expect(typeof parsed[2].age).toBe('number');
        expect(typeof parsed[0].name).toBe('string');
        expect(typeof parsed[2].city).toBe('string');
    });
});