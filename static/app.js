//пишем небольшой фронт на Vue.js
const App = {
    // метод data должен по правилам Vue возвращать объект - СТЕЙТ компонента
    data() {
        return {
            servers: [],
            name: ''
        }
    },
    // объект (не метод!) methods - это поведение компонента - методы
    methods: {
        async createServer() {
            const data = {
                name: this.name,
                status: 'created'
            }
            const response = await fetch('api/server', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            this.name = '';
            const newServer = await response.json();
            this.servers.push(newServer);
        },
        async removeServer(id) {
            const response = await fetch(`api/server/${id}`, {
                method: 'DELETE'
            });
            this.servers = this.servers.filter(server => server.id !== id)
        }
    },
    // а это уже метод жизненного цикла компонента (будет вызван после монтирования компонента)
    async mounted() {
        const response = await fetch('api/server');
        this.servers = await response.json();
    }
}

// Создаём Vue-приложение и монтируем его в элемент
// с id='app' (очень похоже на Реакт)
Vue.createApp(App).mount('#app');