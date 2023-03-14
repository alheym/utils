// isEmpty
// Создайте функцию, которая проверяет, является ли переданный аргумент пустым.
// Аргументами могут быть:
// Object,
// Array,
// Map,
// Set,
// примитивы.
// Значения 0 и другие Number, null, true, false, "", undefined, [], {} должны возвращать true.

/*
isEmpty(null); // => true
isEmpty(true); // => true
isEmpty(1); // => true
isEmpty([1, 2, 3]); // => false
isEmpty({ 'a': 1 }); // => false
isEmpty('123'); // => false
isEmpty(123); // => true
isEmpty(''); // => true
isEmpty(0); // => true
isEmpty(undefined) // => true
isEmpty(new Map([['1', 'str1'], [1, 'num1'], [true, 'bool1']])) // => false
isEmpty(new Set(['value1', 'value2', 'value3'])) // => false
*/


function isEmpty(value) {
    let type = typeof value;
    if (type === 'undefined') { return true; }
    if (type === 'number') { return true; }
    if (type === 'boolean') { return true; }
    if (value === null) { return true; }
    if (value === undefined) { return true; }
    if (value === '') { return true; }

    return false;
}

console.log(isEmpty(null)); // => true
console.log(isEmpty(true)); // => true
console.log(isEmpty(1)); // => true
console.log(isEmpty([1, 2, 3])); // => false
console.log(isEmpty({ 'a': 1 })); // => false
console.log({ 'a': 1 });
console.log(isEmpty('123')); // => false
console.log(isEmpty(123)); // => true
console.log('');
console.log(isEmpty('')); // => true
console.log(isEmpty(0)); // => true
console.log(isEmpty(undefined)); // => true

console.log(new Map([['1', 'str1'], [1, 'num1'], [true, 'bool1']]));
console.log(isEmpty(new Map([['1', 'str1'], [1, 'num1'], [true, 'bool1']])));// => false
console.log(new Set(['value1', 'value2', 'value3']));
console.log(isEmpty(new Set(['value1', 'value2', 'value3'])));// => false
