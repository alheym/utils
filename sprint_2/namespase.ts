// Пространство имён
// Напишите функцию, которая создаёт пространство имён. На вход подаётся строка вида: 
// a.b.c.d.e, на выходе — вложенные друг в друга объекты.
// Проверьте, что разделителем служит точка.

// const namespace = (str: string): object =>
//   str.split(".").reduceRight((acc, key) => ({ [key]: acc }), {});


namespace('a.b.c.d.e')

function namespace(input) {
    let result = {};
    let temp = result;
    const inputArr = input.split(".");
    inputArr.forEach((e) => {
        temp[e] = {};
        temp = temp[e];
    })
    return result;
}

// "{"a":{"b":{"c":{"d":{"e":{}}}}}}"

export default namespace
