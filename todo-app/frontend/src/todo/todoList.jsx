import React from 'react'
import { connect } from 'react-redux'
import { markAsDone, markAsTodo, deleteTodo } from './todoActions'
import { bindActionCreators } from 'redux'
import IconButton from '../template/iconButton'

const TodoList = props => {
    const renderRows = () => {
        const list = props.list || []
        return list.map(todo => (
            <tr key={todo._id}>
                <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
                <td>
                    <IconButton style="success" icon="check"
                        onClick={() => props.markAsDone(todo)} hide={todo.done} />
                    <IconButton style="warning" icon="undo"
                        onClick={() => props.markAsTodo(todo)} hide={!todo.done} />
                    <IconButton style="danger" icon="trash-o" hide={!todo.done}
                        onClick={() => props.deleteTodo(todo)} />
                </td>
            </tr>
        ))
    }
    return (
        <table className="table">
            <thead>
                <tr>
                    <td>Descrição</td>
                    <td className="tableActions">Ações</td>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}

const mapStateToProps = (state) => ({ list: state.todo.list })
const mapDispatchToProps = (dispatch) => bindActionCreators({ markAsDone, markAsTodo, deleteTodo }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
