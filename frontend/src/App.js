import { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer'
import axios from 'axios'
import TodoList from './components/TODO';
import CategoryList from './components/Category';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { LoginForm, RegistrationForm } from './components/Auth';
import Cookies from 'universal-cookie';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            'categories': [],
            'todo': [],
            'token': '',
            'user': ''
        }
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            username: username,
            password: password
        })
            .then(response => {
                this.set_token(response.data['token'])
                this.get_user(username)
            })
            .catch(error => alert('Неверный логин или пароль'))
    }

    set_token(token) {
        const cookies = new Cookies();
        cookies.set('token', token)
        this.setState({ 'token': token }, () => this.load_data())
    }

    set_user(user) {
        const cookies = new Cookies();
        cookies.set('user', user)
        this.setState({ 'user': user }, () => this.load_data())
    }

    is_authenticated() {
        return this.state.token !== ''
    }

    get_user_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        const user = cookies.get('user')
        this.setState({ 'token': token }, () => this.load_data())
        this.setState({ 'user': user }, () => this.load_data())
    }

    logout() {
        this.set_token('')
        this.set_user('')
    }


    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    add_user(username, password) {
        axios.post('http://127.0.0.1:8000/api/user/', {
            username: username,
            password: password
        })
            .then(() => { this.get_token(username, password) })
            .catch((error) => { console.log(error); })
    }

    get_user(username) {
        const headers = this.get_headers()
        axios.get(`http://127.0.0.1:8000/api/user/${username}`, { headers })
            .then(response => { this.set_user(response.data) })
            .catch(error => {
                console.log(error);
                this.setState({ user: '' });
            })
    }

    add_todo(category, text_todo) {
        const headers = this.get_headers()
        const data = {
            'category': category,
            'user': this.state.user.id,
            'text_todo': text_todo,
        }
        axios.post('http://127.0.0.1:8000/api/create_todo/',
            data,
            { headers })
            .then(() => { this.load_data() })
            .catch((error) => { console.log(error); })
    }

    delete_todo(todo_id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${todo_id}/`, { headers })
            .then(() => { this.load_data() })
            .catch((error) => { console.log(error); })

    }

    load_data() {
        const headers = this.get_headers()
        if (this.state.user) {
            axios.get('http://127.0.0.1:8000/api/categories/', { headers })
                .then(response => {
                    this.setState(
                        {
                            'categories': response.data.results
                        }
                    )
                }).catch(error => {
                    console.log(error);
                    this.setState({ categories: [] });
                })

            axios.get(`http://127.0.0.1:8000/api/todo/?user=${this.state.user.id}`, { headers })
                .then(response => {
                    console.log(this.state.user)
                    this.setState(
                        {
                            'todo': response.data.results
                        }
                    )
                }).catch(error => {
                    console.log(error);
                    this.setState({ todo: [] });
                })
        }

    }
    componentDidMount() {
        this.get_user_from_storage()
    }



    render() {
        return (
            <div className="App">
                <div className="container wrapper">
                    <BrowserRouter>
                        <div className='content'>
                            <Header is_authenticated={() => this.is_authenticated()}
                                logout={() => this.logout()}
                                user={this.state.user} />
                            <Routes>
                                <Route path='/' element={<TodoList
                                    categories={this.state.categories}
                                    todo={this.state.todo}
                                    add_todo={(category, text_todo) => { this.add_todo(category, text_todo) }}
                                    delete_todo={(todo_id) => { this.delete_todo(todo_id) }} />} />
                                <Route path='categories' element={<CategoryList categories={this.state.categories} />} />
                                <Route path='login' element={<LoginForm
                                    get_token={(username, password) => this.get_token(username, password)}
                                    token={this.state.token} />} />
                                <Route path='registration' element={<RegistrationForm
                                    add_user={(username, password) => { this.add_user(username, password) }}
                                    token={this.state.token} />} />
                            </Routes>
                        </div>
                        <Footer />
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default App;
