"use strict";
exports.__esModule = true;
exports.notFoundItem = exports.foundDepartment = exports.foundProduct = exports.departments = exports.products = exports.findById = exports.mixedArray = exports.objectArray = exports.booleanArray = exports.getFirstElement = exports.removeVowelsRegex = exports.removeVowels = exports.reverseString = exports.trimAndTransform = exports.capitalizeFirstLetter = exports.getStatusColor = exports.squareArea2 = exports.circleArea2 = exports.rectangleArea = exports.triangleArea = exports.calculateArea = exports.book3 = exports.book2 = exports.book1 = exports.createBook = exports.user3 = exports.user2 = exports.user1 = exports.createUser = void 0;
function createUser(id, name, email, isActive) {
    if (isActive === void 0) { isActive = true; }
    return {
        id: id,
        name: name,
        email: email,
        isActive: isActive
    };
}
exports.createUser = createUser;
exports.user1 = createUser(1, "Алексей Верхотуров", "alex@mail.ru");
exports.user2 = createUser(2, "Екатерина Сергеевна", undefined, false);
exports.user3 = createUser(3, "Дмитрий Поломошнов");
console.log("Task1: Интерфейс User и функция createUser");
console.log("Сотрудник компании:", exports.user1);
console.log("Уволенный сотрудник:", exports.user2);
console.log("Новый сотрудник:", exports.user3);
function createBook(book) {
    return book;
}
exports.createBook = createBook;
exports.book1 = createBook({
    title: "Гарри Поттер и философский камень",
    author: "Дж.К. Роулинг",
    year: 1997,
    genre: "fantasy",
    rating: 4.8
});
exports.book2 = createBook({
    title: "Спартак",
    author: "Рафаэлло Джованьолли",
    genre: "historical"
});
exports.book3 = createBook({
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    year: 1967,
    genre: "fiction",
    rating: 4.9
});
console.log("Task 2: Интерфейс Book и функция createBook");
console.log("Фэнтези книга:", exports.book1);
console.log("Исторический роман :", exports.book2);
console.log("Классика:", exports.book3);
function calculateArea(shape) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
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
exports.calculateArea = calculateArea;
exports.triangleArea = calculateArea('triangle', 6, 8);
exports.rectangleArea = calculateArea('rectangle', 5, 10);
exports.circleArea2 = calculateArea('circle', 3);
exports.squareArea2 = calculateArea('square', 7);
console.log("task 3: Перегрузка функции calculateArea");
console.log("\u041F\u043B\u043E\u0449\u0430\u0434\u044C \u0442\u0440\u0435\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A\u0430 (6x8): ".concat(exports.triangleArea));
console.log("\u041F\u043B\u043E\u0449\u0430\u0434\u044C \u043F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A\u0430 (5x10): ".concat(exports.rectangleArea));
console.log("\u041F\u043B\u043E\u0449\u0430\u0434\u044C \u043A\u0440\u0443\u0433\u0430 (\u0440\u0430\u0434\u0438\u0443\u0441 3): ".concat(exports.circleArea2.toFixed(2)));
console.log("\u041F\u043B\u043E\u0449\u0430\u0434\u044C \u043A\u0432\u0430\u0434\u0440\u0430\u0442\u0430 (\u0441\u0442\u043E\u0440\u043E\u043D\u0430 7): ".concat(exports.squareArea2));
function getStatusColor(status) {
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
            var exhaustiveCheck = status;
            throw new Error("\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439 \u0441\u0442\u0430\u0442\u0443\u0441: ".concat(exhaustiveCheck));
    }
}
exports.getStatusColor = getStatusColor;
console.log("task 4: Тип Status и функция getStatusColor");
console.log("\u0421\u0442\u0430\u0442\u0443\u0441 'blocked' -> \u0446\u0432\u0435\u0442: ".concat(getStatusColor('blocked')));
console.log("\u0421\u0442\u0430\u0442\u0443\u0441 'pending' -> \u0446\u0432\u0435\u0442: ".concat(getStatusColor('pending')));
console.log("\u0421\u0442\u0430\u0442\u0443\u0441 'new' -> \u0446\u0432\u0435\u0442: ".concat(getStatusColor('new')));
var capitalizeFirstLetter = function (str, uppercase) {
    if (uppercase === void 0) { uppercase = false; }
    if (str.length === 0)
        return str;
    var result = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    if (uppercase) {
        result = result.toUpperCase();
    }
    return result;
};
exports.capitalizeFirstLetter = capitalizeFirstLetter;
var trimAndTransform = function (str, uppercase) {
    if (uppercase === void 0) { uppercase = false; }
    var result = str.trim();
    if (uppercase) {
        result = result.toUpperCase();
    }
    return result;
};
exports.trimAndTransform = trimAndTransform;
var reverseString = function (str, uppercase) {
    if (uppercase === void 0) { uppercase = false; }
    var result = str.split('').reverse().join('');
    if (uppercase) {
        result = result.toUpperCase();
    }
    return result;
};
exports.reverseString = reverseString;
var removeVowels = function (str, uppercase) {
    if (uppercase === void 0) { uppercase = false; }
    var vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я', 'a', 'e', 'i', 'o', 'u'];
    var result = '';
    for (var i = 0; i < str.length; i++) {
        var char = str[i];
        if (vowels.indexOf(char.toLowerCase()) === -1) {
            result += char;
        }
    }
    if (uppercase) {
        result = result.toUpperCase();
    }
    return result;
};
exports.removeVowels = removeVowels;
var removeVowelsRegex = function (str, uppercase) {
    if (uppercase === void 0) { uppercase = false; }
    var result = str.replace(/[аеёиоуыэюяaeiou]/gi, '');
    if (uppercase) {
        return result.toUpperCase();
    }
    return result;
};
exports.removeVowelsRegex = removeVowelsRegex;
console.log("task 5: Тип StringFormatter и реализации");
console.log('reverseString("привет мир"):', (0, exports.reverseString)("привет мир"));
console.log('removeVowels("hello world"):', (0, exports.removeVowels)("hello world"));
console.log('removeVowels("hello world", true):', (0, exports.removeVowels)("hello world", true));
console.log('removeVowelsRegex("привет мир"):', (0, exports.removeVowelsRegex)("привет мир"));
//Task 6
function getFirstElement(arr) {
    return arr.length > 0 ? arr[0] : undefined;
}
exports.getFirstElement = getFirstElement;
exports.booleanArray = [true, false, true, false];
exports.objectArray = [{ name: "Алена" }, { name: "Юлия" }, { name: "Карина" }];
exports.mixedArray = [1, "два", true, { value: 4 }];
console.log("task 6: Обобщенная функция getFirstElement");
console.log("Первый элемент массива булевых значений:", getFirstElement(exports.booleanArray));
console.log("Первый элемент массива объектов:", getFirstElement(exports.objectArray));
console.log("Первый элемент смешанного массива:", getFirstElement(exports.mixedArray));
function findById(items, id) {
    for (var i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            return items[i];
        }
    }
    return undefined;
}
exports.findById = findById;
exports.products = [
    { id: 101, name: "Ноутбук", price: 75000, inStock: true },
    { id: 102, name: "Мышь", price: 1500, inStock: true },
    { id: 103, name: "Клавиатура", price: 3500, inStock: false },
    { id: 104, name: "Монитор", price: 25000, inStock: true }
];
exports.departments = [
    { id: 201, name: "ИТ-отдел", floor: 3, employees: 15 },
    { id: 202, name: "Бухгалтерия", floor: 2, employees: 8 },
    { id: 203, name: "Отдел кадров", floor: 1, employees: 5 }
];
exports.foundProduct = findById(exports.products, 103);
exports.foundDepartment = findById(exports.departments, 202);
exports.notFoundItem = findById(exports.products, 999);
console.log("Task 7: Интерфейс HasId и функция findById");
console.log("Поиск товара с id=103 (нет в наличии):", exports.foundProduct);
console.log("Поиск отдела с id=202:", exports.foundDepartment);
console.log("Поиск несуществующего товара:", exports.notFoundItem);
