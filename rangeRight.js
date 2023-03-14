// RangeRight
// Создайте функцию, которая генерирует числовую последовательность с заданным шагом в прямом и в обратном порядке. Для этого переиспользуйте код функции range.
// Функция должна принимать четыре аргумента:
// start — число, с которого начнётся последовательность. Это необязательный аргумент — по умолчанию функция должна начинать с 0.
// end — число, конец последовательности. Функция должна остановиться, не доходя до этого числа.
// step — число, шаг между элементами в последовательности. Это необязательный аргумент: значение по умолчанию — 1.
// isRight — булево значение. Если false, функция генерирует прямой порядок последовательности. Иначе — обратный. Это необязательный аргумент: значение по умолчанию — false.
// В результате функция должна вернуть массив чисел заданной последовательности.

/*
rangeRight(4); // => [3, 2, 1, 0]
rangeRight(-4); // => [-3, -2, -1, 0]
rangeRight(1, 5); // => [4, 3, 2, 1]
rangeRight(0, 20, 5); // => [15, 10, 5, 0]
rangeRight(0, -4, -1); // => [-3, -2, -1, 0]
rangeRight(1, 4, 0); // => [1, 1, 1]
rangeRight(0); // => []
*/

function rangeRight(start, end, step) {
    return range(start, end, step, true);
}


const baseRange = (start, end, step) => {
    let index = -1;
    let length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
    const result = new Array(length);

    while (length--) {
        result[++index] = start;
        start += step;
    }

    return result;
}

// Проверку на типы данных не добавлял, но студенты должны будут
function range(start = 0, end, step, isRight) {

    if (end === undefined) {
        end = start;
        start = 0;
    }

    step = step === undefined ? (start < end ? 1 : -1) : step;

    if (isRight) {
        return baseRange(start, end, step).reverse();
    } else {
        return baseRange(start, end, step);
    }

}

console.log(rangeRight(4)); // => [0, 1, 2, 3] 
console.log(rangeRight(-4)); // => [0, -1, -2, -3]
console.log(rangeRight(1, 5)); // => [1, 2, 3, 4]
console.log(rangeRight(0, 20, 5)); // => [0, 5, 10, 15]
console.log(rangeRight(0, -4, -1)); // => [0, -1, -2, -3]
console.log(rangeRight(1, 4, 0)); // => [1, 1, 1]
console.log(rangeRight(0)); // => []
