// Fetch
// Реализуйте класс для работы с запросами, который:
// Содержит методы GET, PUT, POST, DELETE;
// В методе GET  data трансформируется в формат GET-запроса ?key1=value1&key2=value2;
// По таймауту выбрасывает ошибку;
// Умеет работать с пользовательскими заголовками;
// После успешного ответа — необходимо возвращать в промисе сам XHR, то есть разрезолвить XHR;
// Объект options должен содержать:

// timeout — время на запрос. Если запрос выполняется дольше указанного времени, должен быть reject;
// data — возможность работы с информацией: GET-параметры и JSON;
// headers — объект, для описания заголовков, у которого ключ и значение всегда string.


const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
};

/**
* Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
* На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
* На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
*/
function queryStringify(data) {
    // Можно делать трансформацию GET-параметров в отдельной функции
    if (!data) {
        throw new Error('Не переданы данные!');
    }
    // Здесь достаточно и [object Object] для объекта
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

class HTTPTransport {
    get = (url, options = {}) => {

        return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
    };
    post = (url, options = {}) => {

        return this.request(url, { ...options, method: METHODS.PUT });
    };
    delete = (url, options = {}) => {

        return this.request(url, { ...options, method: METHODS.GET });
    };
    put = (url, options = {}) => {

        return this.request(url, { ...options, method: METHODS.PUT });
    };

    // PUT, POST, DELETE

    // options:
    // headers — obj
    // data — obj
    request = (url, options, timeout = 5000) => {
        const { headers = {}, method, data } = options;

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
