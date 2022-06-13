import './Todo.css';
import { Component } from 'react';
import { TodoForm } from './components/ContainerComponents/TodoForm/TodoForm';
import { TodoItem } from './components/ContainerComponents/TodoItem/TodoItem';
import { TodoItemInfo } from './components/PresentationComponents/TodoItemInfo/TodoItemInfo';
import { TodoSearchItem } from './components/ContainerComponents/TodoSearchItem/TodoSearchItem';
import { TodoEmptyPresentation } from './components/PresentationComponents/TodoEmptyPresentation/TodoEmptyPresentation';
import { HistoryItem } from './components/PresentationComponents/HistoryItem/HistoryItem';


export class Todo extends Component {
    state = {
        list : [
            {id: '1', title: 'Water Plants', description: 'in the kitchen', completed: false, history: 
                [{field: '', action: '', prevValue: '', currentValue: '', appliedAt: ''}], selected: false
            },
            {id: '2', title: 'Pack the bag', description: 'preparation for trip to London', completed: true, history: 
                [{field: '', action: '', prevValue: '', currentValue: '', appliedAt: ''}], selected: false
            },
            {id: '3', title: 'Charge laptop', description: 'preparation for trip to London', completed: false, history: 
                [{field: '', action: '', prevValue: '', currentValue: '', appliedAt: ''}], selected: false
            },
            {id: '4', title: 'Post homeworks to Hillel Course', description: 'React Group from 30.04.2022', completed: false, history: 
                [{field: '', action: '', prevValue: '', currentValue: '', appliedAt: ''}], selected: false
            },
            {id: '5', title: 'Make backup of HDD', description: 'Use TimeMachine for that', completed: false, history: 
                [{field: '', action: '', prevValue: '', currentValue: '', appliedAt: ''}], selected: false
            }
        ],
        filter:''
    };

    getRandomId = (prefix = 'id') =>{
        while(true){
            return `${prefix}-${Math.floor(Date.now() * Math.random())}`
        } 
    }

    date = () => {
        let dateNow = new Date().toLocaleDateString();
        let timeNow = new Date().toLocaleTimeString();
        return dateNow + ' ' + timeNow;
    }

    onItemCompleted = (id) => {

        let todoItem = this.state.list.find(item => item.id === id) ;
        let prevValueCompleton = todoItem.completed;
        let updatedItem = {...todoItem, completed: !todoItem.completed};
        // console.log(updatedItem.history)
        updatedItem.history.push(
            {field: 'completion', action: todoItem.completed ? `The task is NOT completed` : `The task is completed`, 
            prevValue: prevValueCompleton, currentValue: updatedItem.completed, appliedAt: this.date()}
        )
        // console.log(updatedItem.history)

        this.setState({
            list: this.state.list.map(item => item.id === id ? updatedItem : item)}, 
        // () => console.log(this.state)
        )
    }

    onItemSelected = (id) => {

        let todoItem = this.state.list.find(item => item.id === id);
        let updatedItem = {...todoItem, selected: !todoItem.selected};

        this.setState({ 
            list: this.state.list.map(item => item.selected = false)
        })

        this.setState({
            list: this.state.list.map(item => item.id === id ? updatedItem : item)
        })
    }

    todoAddHandler = (newItem) => {
        // console.log(newItem)
        this.setState({
            list: [...this.state.list, newItem]},
            // ()=> console.log(this.state)
        )   
    }
    
    onFormSubmitHandler = (event) =>{ 
        event.preventDefault();
        
        this.setState({ 
            list: this.state.list.map(item => item.selected = false)
        })
     
        let newItem = {id: this.getRandomId(), title: this.state.title, description: '', completed: false, history: 
                [{field: 'title', action: `Created task with title "${this.state.title}"`, prevValue: '', currentValue: this.state.title, appliedAt: this.date()}], selected: false
            }
        this.todoAddHandler(newItem);
    }

    onTitleChangeHandler = ({target}) => {
        this.setState(
            {list: [...this.state.list], title: target.value}
        )
    }

    onDescrSubmitHandler = (event) => { 
        event.preventDefault();
        this.state.list.filter(item => {
            if(item.selected && this.state.updatedDescr && this.state.updatedDescr !== item.description){
                let prevValueDescr = item.description;
                item.description = this.state.updatedDescr;

                let newHistoryRecord = {field: 'description', action: `Changed task description from "${prevValueDescr}" to "${item.description}"`, prevValue: prevValueDescr, currentValue: this.state.updatedDescr, appliedAt: this.state.timeChange}
                item.history.push(newHistoryRecord);
                console.log(item.history);
                return this.setState({list: [...this.state.list]});

            } else {
                return item.description;
            }
        })
        // console.log(this.state)
    }
    
    onDescrChangeHandler = ({target}) =>{
        this.setState(
            {list: [...this.state.list], updatedDescr: target.value, timeChange : this.date()},
            // ()=> console.log(this.state)
        )
    }

    onSearchTitleFilter = ({target}) => {
        this.setState({ 
            list: this.state.list.map(item => item.selected = false)
        })

        this.setState(
            {list: [...this.state.list], filter: target.value.toLowerCase()}
        )
    }

    onSearchSubmitHandler = (e) =>{
        e.preventDefault();
    }

    render(){
       
        return (
            <div className='todo-container'>
                <div className='todo-containerComponents'>
                    <h1 className='todo-title'>Todos</h1>
                    <TodoSearchItem 
                        onSearchTitleFilter = {this.onSearchTitleFilter}
                        onSearchSubmitHandler = {this.onSearchSubmitHandler}/>

                    {this.state.list.map(item => item.title.toLowerCase().includes(this.state.filter) &&
                        <TodoItem
                            key = {item.id}
                            item = {item}
                            onItemCompleted = {this.onItemCompleted}
                            onItemSelected = {this.onItemSelected} />)
                    }

                    <TodoForm
                        item = {this.state.list}
                        onTitleChangeHandler = {this.onTitleChangeHandler}
                        onFormSubmitHandler = {this.onFormSubmitHandler}
                        todoAddHandler = {this.todoAddHandler} />
                </div>
                <div className='todo-presentationComponents'>
                    
                    {this.state.list.map(item => item.selected &&
                        <TodoItemInfo
                            key = {item.id}
                            item = {item}
                            onDescrChangeHandler = {this.onDescrChangeHandler}
                            onDescrSubmitHandler = {this.onDescrSubmitHandler} />
                    )}

                    {this.state.list.map(item => item.selected &&
                        item.history.map(eachHistory => eachHistory &&
                            <HistoryItem
                            key = {this.getRandomId('historyId')}
                            historyItem = {eachHistory} />)
                    )}

                    {this.state.list.every(item => !item.selected) ? <TodoEmptyPresentation/> : <></> }                  
                </div>        
            </div>
        )
    }
}