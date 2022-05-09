// напишем контроллеры!
// моковые данные (типа база данных =))
let mockServers = [
    {id: '1', name: 'AWS', status: 'working'},
    {id: '2', name: 'Google Cloud', status: 'working'},
    {id: '3', name: 'Yandex Cloud', status: 'working'},
    {id: '4', name: 'Microsoft', status: 'pending'},
]

// контроллер это по сути функция, которая также работает
// с response / request(эти объекты передаёт сам Express) и их методами
export const getAll = (request, response) => {
    // данная функция при вызове будет возвращать ответ
    // - со статусом 200
    // - с данными в формате .JSON
    response.status(200).json(mockServers);
}

// контроллер, который позволяет создавать новые сущности и добавлять их в массив данных
export const create = (request, response) => {
    const newServer = {
        id: Date.now().toString(),
        ...request.body
    }
    // добавляем
    mockServers.push(newServer);
    // устанавливаем ответу статус, конвертируем в JSON и отправляем
    response.status(201).json(newServer);
}

// контроллер, который позволяет удалять имеющиеся сущности из массива данных
export const remove = (request, response) => {
    // удаляем из массива по ID
    mockServers = mockServers.filter(server => server.id !== request.params.id);
    // устанавливаем ответу статус, конвертируем в JSON и отправляем
    response.status(200).json({ message: 'Server removed!' });
}