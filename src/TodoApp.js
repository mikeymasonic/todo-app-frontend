import React, { Component } from 'react'
import AddTodo from './AddTodo.js';
import request from 'superagent';

export default class TodoApp extends Component {
    state = { todos: [] }
    componentDidMount = async() => {
        const todos = await request.get('https://todo-app-backend-demo.herokuapp.com/api/todos')

        console.log(todos.body)
        this.setState({ todos: todos.body })
    }

    // handleDelete = async () => {
    //     await request.delete(`https://todo-app-backend-demo.herokuapp.com/api/todos/${this.state.id}`);

    //     this.state.history.push('/');
    // }

    handleClick = async () => {
        const newTodo = {
            // math.random() is fine here because this is a fake todo
            id: Math.random(),
            task: this.state.todoInput,
            complete: false,
        };

        const newTodos = [...this.state.todos, newTodo];

        this.setState({ todos: newTodos });
        const data = await request.post('https://todo-app-backend-demo.herokuapp.com/api/todos', {
            task: this.state.todoInput
        });
    }

    handleInput = (e) => { this.setState({ todoInput: e.target.value })};
    
    render() {
        return (
            <div className = "todoBox">
                <AddTodo 
                todoInput={ this.state.todoInput } 
                handleClick={ this.handleClick } 
                handleInput={ this.handleInput } 
            />
                {
                    this.state.todos.map((todo, index) => 
                    <p 
                        style={{
                            textDecoration: todo.complete ? 'line-through' : 'none',
                            opacity: todo.complete ? '0.5' : '1',
                            fontStyle: todo.complete ? 'italic' : 'normal',
                            textShadow: todo.complete ? 'none' : '1px 1px 6px rgb(97, 223, 232)',

                        }}   
                        
                        onClick={async () => {
                            // lets mutate! make a copy of the array in state
                        const newTodos = this.state.todos.slice();
                            // go find whichever todo we're talking about here
                        const matchingTodo = newTodos.find((thisTodo) => todo.id === thisTodo.id);

                        matchingTodo.complete = !todo.complete
                                 
                        this.setState({ todos: newTodos });
                        const data = await request.put(`https://todo-app-backend-demo.herokuapp.com/api/todos/${todo.id}`, matchingTodo);
                    }} key={todo.id}>
                        {todo.task}

                        <button className="delete" onClick={async () => {
                            await request.delete(`https://todo-app-backend-demo.herokuapp.com/api/todos/${todo.id}`)
                            const deletedTodos = this.state.todos.slice();
                            deletedTodos.splice(index, 1);
                            this.setState({ todos: deletedTodos });
                        }}><img className="deleteButton" src="../assets/images/delete.png" alt="submit" /></button>
                        
                    </p>)
                }
            </div>
        )
    }
}
