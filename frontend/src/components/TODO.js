import React, { Component } from 'react'

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = { 'todo_text': '', 'todo_category': '', 'class_visible': 'd-none' }
    }

    save_todo() {
        this.props.add_todo(this.state.todo_category, this.state.todo_text)
        this.setState({ class_visible: 'd-none' })
    }

    delete_todo(id) {
        this.props.delete_todo(id)
    }


    render() {
        return (
            <div>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th scope="col">Текст</th>
                            <th scope="col">Категория</th>
                            <th scope="col">isActive</th>
                            <th scope='col'>Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.todo.map((todo) =>
                            <tr>
                                <td>{todo.textTodo}</td>
                                <td>{todo.category.name}</td>
                                <td>
                                    <input className="form-check-input mt-0" type="checkbox" ></input>
                                </td>
                                <td><button
                                    onClick={() => { this.delete_todo(todo.id) }}
                                    type="submit" className="btn">Удалить</button></td>
                            </tr>
                        )}
                        <tr id='add-todo' className={this.state.class_visible}>
                            <td>
                                <input onChange={(event) => {
                                    console.log(event.target.value)
                                    this.setState({ 'todo_text': event.target.value })
                                }}
                                    type="todo" className="table-input form-control" />
                            </td>
                            <td>
                                <select
                                    onChange={(event) => {
                                        console.log(event.target.value)
                                        this.setState({ 'todo_category': event.target.value })
                                    }}
                                    className="form-select table-input">
                                    <option selected>Выбрать категорию</option>
                                    {this.props.categories.map((category) => <option value={category.id}>{category.name}</option>)}
                                </select>
                            </td>
                            <td>
                            </td>
                            <td>
                                <button type="button" className="btn"
                                    onClick={() => { this.save_todo() }}
                                >Сохранить</button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4">
                                <button onClick={() => { this.setState({ class_visible: '' }) }}
                                    className='btn'>Добавить todo
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div >
        )
    }
}
export default TodoList