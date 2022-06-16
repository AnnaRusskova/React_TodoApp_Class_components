import './Todo.css';
import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoForm } from './components/ContainerComponents/TodoForm/TodoForm';
import { TodoItem } from './components/ContainerComponents/TodoItem/TodoItem';
import { TodoItemInfo } from './components/PresentationComponents/TodoItemInfo/TodoItemInfo';
import { TodoSearchBar } from './components/ContainerComponents/TodoSearchItem/TodoSearchItem';
import { TodoEmptyPresentation } from './components/PresentationComponents/TodoEmptyPresentation/TodoEmptyPresentation';

const date = () => {
    let dateNow = new Date().toLocaleDateString();
    let timeNow = new Date().toLocaleTimeString();
    return dateNow + ' ' + timeNow;
}

// DTO - Data Transfer Object
const Actions = {
    CREATED: "CREATED",
    UPDATED: "UPDATED",
    DELETED: "DELETED",
};

class HistoryItemDTO {
    constructor(field, action = Actions.CREATED, prevValue = "", currentValue, appliedAt) {
        this.id = uuidv4();
        this.field = field;
        this.action = action;
        this.prevValue = prevValue;
        this.currentValue = currentValue;
        this.appliedAt = appliedAt;
    }
}

class TodoItemDTO {
    constructor(title, description) {
        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.completed = false;
        this.history = [new HistoryItemDTO('title', Actions.CREATED, "", title, date())]; // Date.now()
    }
}


export class Todo extends Component {
    state = {
        list: [
            new TodoItemDTO('Water Plants', 'in the kitchen'),
            new TodoItemDTO('Pack the bag', 'preparation for trip to London'),
            new TodoItemDTO('Charge laptop', 'preparation for trip to Kherson'),
        ],
        filter: '',
        selectedItem: null,
    };

    // DONE ✅
    onItemCompleted = (id) => {
        let prevTodoItem = this.state.list.find(item => item.id === id);
        let updatedItem = { ...prevTodoItem, completed: !prevTodoItem.completed };

        updatedItem.history.push(new HistoryItemDTO(
            'completed',
            Actions.UPDATED,
            prevTodoItem.completed,
            updatedItem.completed,
            date(),
        ));

        this.setState({
            list: this.state.list.map(item => item.id === id ? updatedItem : item)
        });
    }

    // DONE ✅
    onItemSelected = (id) => {
        let todoItem = this.state.list.find(item => item.id === id);
        this.setState({ selectedItem: todoItem });
    }

    todoAddHandler = (newItem) => {
        this.setState({
            list: [...this.state.list, newItem]
        },
            // ()=> console.log(this.state)
        )
    }

    onFormSubmitHandler = (event) => {
        event.preventDefault();

        this.setState({
            list: this.state.list.map(item => item.selected = false)
        })

        let newItem = new TodoItemDTO(this.state.title, 'This is default Description');
        this.todoAddHandler(newItem);
    }

    onTitleChangeHandler = ({ target }) => {
        this.setState(
            { list: [...this.state.list], title: target.value }
        )
    }

    onDescrSubmitHandler = (event) => {
        event.preventDefault();
        this.state.list.filter(item => {
            if (item.selected && this.state.updatedDescr && this.state.updatedDescr !== item.description) {
                let prevValueDescr = item.description;
                item.description = this.state.updatedDescr;

                let newHistoryRecord = { field: 'description', action: `Changed task description from "${prevValueDescr}" to "${item.description}"`, prevValue: prevValueDescr, currentValue: this.state.updatedDescr, appliedAt: this.state.timeChange }
                item.history.push(newHistoryRecord);
                console.log(item.history);
                return this.setState({ list: [...this.state.list] });

            } else {
                return item.description;
            }
        });
    }

    onDescrChangeHandler = ({ target }) => {
        this.setState(
            { list: [...this.state.list], updatedDescr: target.value, timeChange: date() },
            // ()=> console.log(this.state)
        )
    }

    onSearchTitleFilter = ({ target }) => {
        this.setState({ filter: target.value.toLowerCase() });
    }

    getFilteredItems = () => {
        return this.state.filter
            ? this.state.list.filter(todo => todo.title.toLowerCase().includes(this.state.filter))
            : this.state.list;
    };

    render() {

        return (
            <div className='todo-container'>
                <div className='todo-containerComponents'>
                    <h1 className='todo-title'>Todos</h1>
                    <TodoSearchBar onSearchTitleFilter={this.onSearchTitleFilter} />

                    {this.getFilteredItems().map(item => <TodoItem
                        key={item.id}
                        item={item}
                        selected={this.state.selectedItem ? item.id === this.state.selectedItem.id : false}
                        onItemCompleted={this.onItemCompleted}
                        onItemSelected={this.onItemSelected}
                    />)}

                    <TodoForm
                        item={this.state.list}
                        onTitleChangeHandler={this.onTitleChangeHandler}
                        onFormSubmitHandler={this.onFormSubmitHandler}
                        todoAddHandler={this.todoAddHandler} />
                </div>
                <div className='todo-presentationComponents'>

                    {/* {this.state.list.map(item => item.selected &&
                        <TodoItemInfo
                            key={item.id}
                            item={item}
                            onDescrChangeHandler={this.onDescrChangeHandler}
                            onDescrSubmitHandler={this.onDescrSubmitHandler} />
                    )} */}

                    {this.state.selectedItem
                        ? <TodoItemInfo
                            key={this.state.selectedItem.id}
                            item={this.state.selectedItem}
                            onDescrChangeHandler={this.onDescrChangeHandler}
                            onDescrSubmitHandler={this.onDescrSubmitHandler} />
                        : <TodoEmptyPresentation />
                    }
                </div>
            </div>
        )
    }
}