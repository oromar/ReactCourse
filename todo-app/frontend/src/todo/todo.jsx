import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'


export default class Todo extends Component {

    constructor(props) {
        super(props)
        this.state = { description: '', list: [] }

        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.refresh = this.refresh.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.refresh()
    }
    refresh(description = '') {
        console.log(description)
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({ ...this.state, list: resp.data, description }))
            .catch(e => alert('Erro ao recuperar as tarefas' + e.message))
    }
    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value })
    }
    handleAdd() {
        const description = this.state.description
        axios.post(URL, { description })
            .then(resp => this.refresh())
            .catch(e => alert('Erro ao inserir a tarefa'))
    }
    handleRemove(todo) {
        if (confirm(`Confirma exclusão de ${todo.description}`)) {
            axios.delete(`${URL}/${todo._id}`)
                .then(resp => this.refresh(this.state.description))
                .catch(e => alert('Erro ao remover'))
        }
    }
    handleCheck(todo) {
        axios.put(`${URL}/${todo._id}`, { done: !todo.done, description: todo.description })
            .then(resp => this.refresh(this.state.description))
            .catch(e => alert('Erro ao alterar'))
    }
    handleSearch() {
        this.refresh(this.state.description)
    }
    handleClear() {
        this.setState({ ...this.state, description: '' })
        this.refresh()
    }
    render() {
        return (
            <div>
                <PageHeader name="Tarefas" small="Cadastro" />
                <TodoForm description={this.state.description}
                    handleAdd={this.handleAdd}
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear} />
                <TodoList list={this.state.list}
                    handleRemove={this.handleRemove}
                    handleCheck={this.handleCheck} />
            </div>
        )
    }
}