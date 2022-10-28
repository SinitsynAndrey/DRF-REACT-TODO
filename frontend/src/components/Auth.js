import React from "react";
import { Navigate } from "react-router-dom";

export class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 'login': '', 'password': '' }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            });
    }

    handleSubmit(event) {
        this.props.get_token(this.state.login, this.state.password);
        event.preventDefault()
    }

    render() {
        return (
            <div>
                {this.props.token && (
                    <Navigate to="/" replace={true} />
                )}

                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input className="form-control" type="text" name="login" placeholder="Логин "
                        value={this.state.login} onChange={(event) => this.handleChange(event)} />
                    <input className="form-control" type="password" name="password" placeholder="Пароль"
                        value={this.state.password} onChange={(event) => this.handleChange(event)} />
                    <button className="btn btn-primary" type="submit" value="Login">Войти</button>
                </form>
            </div>
        );
    }
}

export class RegistrationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 'username': '', 'password': '', 'password2': '' }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            });
    }

    handleSubmit(event) {
        if (this.state.password === this.state.password2) {
            this.props.add_user(this.state.username, this.state.password);
        }
        else {
            alert('Пароли не совпадают')
        }
        event.preventDefault()
    }

    render() {
        return (
            <div>
                {this.props.token && (
                    <Navigate to="/" replace={true} />
                )}
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input className="form-control" type="text" name="username" placeholder="Логин"
                        value={this.state.username} onChange={(event) => this.handleChange(event)} />
                    <input className="form-control" type="password" name="password" placeholder="Пароль"
                        value={this.state.password} onChange={(event) => this.handleChange(event)} />
                    <input className="form-control" type="password" name="password2" placeholder="Повторите пароль"
                        value={this.state.password2} onChange={(event) => this.handleChange(event)} />
                    <button className="btn btn-primary" type="submit" value="Registretion">Зарегистрироваться</button>
                </form>
            </div>
        );
    }
}
