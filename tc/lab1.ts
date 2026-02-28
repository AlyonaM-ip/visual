// task1
export interface User {
    id: number;
    name: string;
    email?: string;
    isActive: boolean;
}

export function createUser(id: number, name: string, email?: string, isActive: boolean = true): User {
    return {
        id,
        name,
        email,
        isActive
    };
}

export const user1 = createUser(1, "Алексей Верхотуров", "alex@mail.ru");
export const user2 = createUser(2, "Екатерина Сергеевна", undefined, false);
export const user3 = createUser(3, "Дмитрий Поломошнов");

console.log("Task1: Интерфейс User и функция createUser");
console.log("Сотрудник компании:", user1);
console.log("Уволенный сотрудник:", user2);
console.log("Новый сотрудник:", user3);

//task 2
export type Genre = 'fiction' | 'non-fiction' | 'historical' | 'fantasy';

export interface Book {
    title: string;
    author: string;
    year?: number;
    genre: Genre;
    rating?: number;
}

export function createBook(book: Book): Book {
    return book;
}

export const book1 = createBook({
    title: "Гарри Поттер и философский камень",
    author: "Дж.К. Роулинг",
    year: 1997,
    genre: "fantasy",
    rating: 4.8
});

export const book2 = createBook({
    title: "Спартак",
    author: "Рафаэлло Джованьолли",
    genre: "historical"
});

export const book3 = createBook({
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    year: 1967,
    genre: "fiction",
    rating: 4.9
});

console.log("Task 2: Интерфейс Book и функция createBook");
console.log("Фэнтези книга:", book1);
console.log("Исторический роман :", book2);
console.log("Классика:", book3);

//Task 3
export function calculateArea(shape: 'circle', radius: number): number;
export function calculateArea(shape: 'square', side: number): number;
export function calculateArea(shape: 'triangle', base: number, height: number): number;
export function calculateArea(shape: 'rectangle', width: number, height: number): number;
export function calculateArea(shape: string, ...args: number[]): number {
    switch (shape) {
        case 'circle':
            return Math.PI * args[0] * args[0];
        case 'square':
            return args[0] * args[0];
        case 'triangle':
            return (args[0] * args[1]) / 2;
        case 'rectangle':
            return args[0] * args[1];
        default:
            throw new Error('Неподдерживаемая фигура');
    }
}

export const triangleArea = calculateArea('triangle', 6, 8);
export const rectangleArea = calculateArea('rectangle', 5, 10);
export const circleArea2 = calculateArea('circle', 3);
export const squareArea2 = calculateArea('square', 7);

console.log("task 3: Перегрузка функции calculateArea");
console.log(`Площадь треугольника (6x8): ${triangleArea}`);
console.log(`Площадь прямоугольника (5x10): ${rectangleArea}`);
console.log(`Площадь круга (радиус 3): ${circleArea2.toFixed(2)}`);
console.log(`Площадь квадрата (сторона 7): ${squareArea2}`);

//Task 4
export type Status = 'active' | 'inactive' | 'new' | 'blocked' | 'pending';

export function getStatusColor(status: Status): string {
    switch (status) {
        case 'active':
            return 'green';
        case 'inactive':
            return 'gray';
        case 'new':
            return 'blue';
        case 'blocked':
            return 'red';
        case 'pending':
            return 'orange';
        default:
            const exhaustiveCheck: never = status;
            throw new Error(`Неизвестный статус: ${exhaustiveCheck}`);
    }
}

console.log("task 4: Тип Status и функция getStatusColor");
console.log(`Статус 'blocked' -> цвет: ${getStatusColor('blocked')}`);
console.log(`Статус 'pending' -> цвет: ${getStatusColor('pending')}`);
console.log(`Статус 'new' -> цвет: ${getStatusColor('new')}`);

//task 5
export type StringFormatter = (str: string, uppercase?: boolean) => string;

export const capitalizeFirstLetter: StringFormatter = (str: string, uppercase: boolean = false): string => {
    if (str.length === 0) return str;
    
    let result = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    
    if (uppercase) {
        result = result.toUpperCase();
    }
    
    return result;
};

export const trimAndTransform: StringFormatter = (str: string, uppercase: boolean = false): string => {
    let result = str.trim();
    
    if (uppercase) {
        result = result.toUpperCase();
    }
    
    return result;
};

export const reverseString: StringFormatter = (str: string, uppercase: boolean = false): string => {
    let result = str.split('').reverse().join('');
    
    if (uppercase) {
        result = result.toUpperCase();
    }
    
    return result;
};

export const removeVowels: StringFormatter = (str: string, uppercase: boolean = false): string => {
    const vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я', 'a', 'e', 'i', 'o', 'u'];
    let result = '';
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (vowels.indexOf(char.toLowerCase()) === -1) {
            result += char;
        }
    }
    
    if (uppercase) {
        result = result.toUpperCase();
    }
    
    return result;
};

export const removeVowelsRegex: StringFormatter = (str: string, uppercase: boolean = false): string => {
    const result = str.replace(/[аеёиоуыэюяaeiou]/gi, '');
    
    if (uppercase) {
        return result.toUpperCase();
    }
    
    return result;
};

console.log("task 5: Тип StringFormatter и реализации");
console.log('reverseString("привет мир"):', reverseString("привет мир"));
console.log('removeVowels("hello world"):', removeVowels("hello world"));
console.log('removeVowels("hello world", true):', removeVowels("hello world", true));
console.log('removeVowelsRegex("привет мир"):', removeVowelsRegex("привет мир"));

//Task 6
export function getFirstElement<T>(arr: T[]): T | undefined {
    return arr.length > 0 ? arr[0] : undefined;
}

export const booleanArray = [true, false, true, false];
export const objectArray = [{ name: "Алена" }, { name: "Юлия" }, { name: "Карина" }];
export const mixedArray = [1, "два", true, { value: 4 }];

console.log("task 6: Обобщенная функция getFirstElement");
console.log("Первый элемент массива булевых значений:", getFirstElement(booleanArray));
console.log("Первый элемент массива объектов:", getFirstElement(objectArray));
console.log("Первый элемент смешанного массива:", getFirstElement(mixedArray));

//Task 7
export interface HasId {
    id: number;
}

export function findById<T extends HasId>(items: T[], id: number): T | undefined {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            return items[i];
        }
    }
    return undefined;
}

export interface Product extends HasId {
    name: string;
    price: number;
    inStock: boolean;
}

export interface Department extends HasId {
    name: string;
    floor: number;
    employees: number;
}

export const products: Product[] = [
    { id: 101, name: "Ноутбук", price: 75000, inStock: true },
    { id: 102, name: "Мышь", price: 1500, inStock: true },
    { id: 103, name: "Клавиатура", price: 3500, inStock: false },
    { id: 104, name: "Монитор", price: 25000, inStock: true }
];

export const departments: Department[] = [
    { id: 201, name: "ИТ-отдел", floor: 3, employees: 15 },
    { id: 202, name: "Бухгалтерия", floor: 2, employees: 8 },
    { id: 203, name: "Отдел кадров", floor: 1, employees: 5 }
];

export const foundProduct = findById(products, 103);
export const foundDepartment = findById(departments, 202);
export const notFoundItem = findById(products, 999);

console.log("Task 7: Интерфейс HasId и функция findById");
console.log("Поиск товара с id=103 (нет в наличии):", foundProduct);
console.log("Поиск отдела с id=202:", foundDepartment);
console.log("Поиск несуществующего товара:", notFoundItem);