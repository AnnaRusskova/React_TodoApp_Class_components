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
        ]
    };

    onItemCompleted = (id) => {

        let todoItem = this.state.list.find(item => item.id === id) ;
        let updatedItem = {...todoItem, completed: !todoItem.completed};

        this.setState({
            list: this.state.list.map(item => item.id === id ? updatedItem : item)}, 
        // () => console.log(this.state.list[0].completed)
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

    getRandomId = (prefix = 'id') =>{
        while(true){
            return `${prefix}-${Math.floor(Date.now() * Math.random())}`
        } 
    }

    todoAddHandler = (newItem) => { 
        // console.log(newItem)
        this.setState(
            {list: [...this.state.list, newItem]},
            ()=> console.log(this.state)
        )   
    }
    
    onFormSubmitHandler = (event) =>{ 
        event.preventDefault();
        
        this.setState({ 
            list: this.state.list.map(item => item.selected = false)
        })
        // console.log(this.state)
        let newItem =JSON.parse(JSON.stringify(this.state.list[0]));
        newItem.title = this.state.title;
        newItem.id= this.getRandomId();
        newItem.completed= false;
        newItem.description= '';
        newItem.history[0].action = `Created task with title "${newItem.title}"`;
        newItem.history[0].description = '';
        newItem.history[0].appliedAt = this.date();
        // console.log(newItem)
        this.todoAddHandler(newItem);
    }

    onTitleChangeHandler = ({target}) => {
        this.setState(
            {list: [...this.state.list], title: target.value}
        )
    }

    date = () =>{
        let dateNow = new Date().toLocaleDateString();
        let timeNow = new Date().toLocaleTimeString();
        return dateNow + ' ' + timeNow;
    }

    
    onDescrSubmitHandler = (event) => {
        event.preventDefault();
        this.state.list.filter(item => {
            if(item.selected && this.state.updatedDescr){
                item.history[0].prevValue = item.description; 
                item.description = this.state.updatedDescr;
                item.history[0].currentValue = item.description;
                item.history[0].action = `Changed task description from "${item.history[0].prevValue ? item.history[0].prevValue : 'no description'}" to "${item.history[0].currentValue}"`;
                return item.history[0].appliedAt = this.state.timeChange
            } else {
                return item.description
            }
        })

        this.setState({...this.state.list}) 
        // console.log(this.state)
    }
    
    onDescrChangeHandler = ({target}) =>{
        this.setState(
            {list: [...this.state.list], updatedDescr: target.value, timeChange : this.date()},
            // ()=> console.log(this.state)
        )
    }
    

    render(){
        return (
            <div className='todo-container'>
                <div className='todo-containerComponents'>
                    <h1 className='todo-title'>Todos</h1>
                    <TodoSearchItem />

                    {this.state.list.map(item =>
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

                    {this.state.list.map(item => item.selected && this.onDescrSubmitHandler &&

                     <HistoryItem 
                        key = {item.id}
                        item = {item} />
                    )}

                    {this.state.list.every(item => !item.selected) ? <TodoEmptyPresentation/> : <></> }                  
                </div>        
            </div>
        )
    }
}