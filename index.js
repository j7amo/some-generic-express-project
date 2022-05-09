// наша точка входа в приложение (именно с запуска этого файла в среде NodeJS начинается работа)
// импортируем express
import express from 'express';
import path from 'path';
// импортируем самописные middleware
import { requestTime, logger } from './middlewares.js';
// импортируем настроенный роутер
import router from './routes/router.js';

// так как при использовании ES-модулей переменная
// __dirname больше не "подсовывается" (как в случае с CJS-модулями),
// то нам нужно принудительно её получить:
const __dirname = path.resolve();

// задаём значение для порта
const PORT = process.env.PORT || 3000;

// создаём Express-приложение
const app = express();

// подключаем в качестве view engine шаблонизатор EJS
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'ejs'));

// добавим middleware, которое позволит express'у "смотреть"
// в папку STATIC и отдавать оттуда релевантные запросу ресурсы
// это пригодится для response.render
app.use(express.static(path.resolve(__dirname, 'static')));
// также подключим самописные middleware (баловство, чтобы понять принцип middleware)
app.use(requestTime);
app.use(logger);
// больше встроенных middleware!
// здесь происходит парсинг JSONа
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// подключаем роутер, который является по совместительству middleware
app.use(router);

// фронт напишем частично с использованием шаблонизатора EJS и возможностей Express (а частично на VueJS)
// в данном случае мы просто рендерим определённые EJS-страницы в заисимости от того какой запрос (в данном случае
// только GET- запросы) и на какой эндпоинт мы отправляем
app.get('/', (request, response) => {
    response.render('index', { title: 'Main Page', active: 'main' });
})

app.get('/features', (request, response) => {
    response.render('features', { title: 'Features Page', active: 'features' });
})

// запускаем сервер на 3000 порту
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});