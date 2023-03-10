// Last
// Напишите функцию, которая принимает массив и возвращает его последний элемент.  
// Кроме того, функция должна:
// Обработать невалидные значения: если аргументом окажется не массив, функция должна вернуть undefined;
// Если функция вышла за границы массива — верните undefined.

// [1, 2, 3, 4] => 4

function last(list) {
    if (Array.isArray(list)) {
        return list[list.length - 1];
    }
    else {
        return undefined;
    }
}

const arr = '[1, 2, 3, 4, 80]';
console.log(last(arr));
