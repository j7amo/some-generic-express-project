import colors from 'colors';
// middleware в express - это функция, которая:
// - принимает объект request, объект response, функцию next
// - делает свою основную работу
// - по завершении вызывает next, что позволяет либо перейти
// к следующему middleware в цепочке, либо закончить цепочку, если
// текущий middleware - последний

// создадим свои middleware
// 1) первый middleware будет дописывать текущие дату и время
// в милисекундах объект запроса
export function requestTime(request, response, next) {
    request.requestTime = Date.now();
    // если не вызвать next, то приложение работать не будет -
    // застрянем на этой функции
    next();
}

// 2) второй middleware будет красиво выводить в консоль время запроса
export function logger(request, response, next) {
    console.log(colors.bgGreen.black(`Request time: ${request.requestTime}`));
    next();
}