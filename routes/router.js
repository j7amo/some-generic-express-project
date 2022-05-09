// импортируем встроенный в Express middleware - Router
import { Router } from 'express';
// импортируем контроллеры
import { getAll, create, remove } from '../controllers/api.js';

// создадим экземпляр Router-middleware, который позволит нам
// работать с роутингом
const router = Router();

// в роутере описываем, что при GET-запросе к эндпоинту '/api/server'
// отработает контроллер getAll
router.get('/api/server', getAll);
// добавляем обработку POST-запроса к эндпоинту '/api/server'
router.post('/api/server', create);
// добавляем обработку DELETE-запроса к эндпоинту '/api/server'
// здесь есть динамический параметр (пишется через :)
router.delete('/api/server/:id', remove);

export default router;