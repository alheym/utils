// Реактивность
// Реализуйте «реактивность» на основе defineProperty. 
// Необходимо, чтобы при написании текста в инпуте, в div сразу отображался введённый текст. 
// Слушать нужно событие keyup.

// Добавьте в объект метод, который заменяет текст в div (переменная text) на результат ввода. 
// После этого останется только повесить на инпут обработчик событий.


type Nullable<T> = T | null;

const text: Nullable<HTMLDivElement> = document.getElementById(
    "text"
) as HTMLDivElement;
const input: Nullable<HTMLInputElement> = document.getElementById(
    "input"
) as HTMLInputElement;

if (!text || !input) {
    throw new Error("нет полей");
}

input.addEventListener('keyup', function () {
    text.innerText = input.value;
})

const data = {
    title: ""
};

Object.defineProperty(data, 'title', {});

export default Nullable
