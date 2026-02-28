function csvToJSON(input, delimiter) {
    if (!input || input.length === 0) {
        throw new Error("Входной массив пуст");
    }
    if (input.length < 2) {
        throw new Error("Нет строк с данными");
    }
    var headers = input[0].split(delimiter);
    if (headers.length === 0 || headers.some(function (h) { return h.trim() === ''; })) {
        throw new Error("Неверные заголовки");
    }
    var result = [];
    for (var i = 1; i < input.length; i++) {
        var values = input[i].split(delimiter);
        if (values.length !== headers.length) {
            throw new Error("\u0421\u0442\u0440\u043E\u043A\u0430 ".concat(i + 1, ": \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439 \u043D\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u0443 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u0432"));
        }
        var obj = {};
        for (var j = 0; j < headers.length; j++) {
            var header = headers[j].trim();
            var value = values[j].trim();
            var numValue = Number(value);
            obj[header] = isNaN(numValue) ? value : numValue;
        }
        result.push(obj);
    }
    return result;
}
// Пример из задания
var res = csvToJSON(["p1;p2;p3;p4", "1;A;b;c", "2;B;v;d"], ';');
console.log(res);
