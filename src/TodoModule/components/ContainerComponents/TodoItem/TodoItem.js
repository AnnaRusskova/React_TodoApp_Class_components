import { Component } from "react";
import './TodoItem.css';

export class TodoItem extends Component{
    render(){
        return (
            <div className="todoItem-container">
                <div 
                    className={this.props.item.selected ? "todoItem-item todoItem_selected" : "todoItem-item" }>
                    <div>
                        <div 
                            onClick = {() => this.props.onItemCompleted(this.props.item.id)} 
                            className = {this.props.item.completed ? "todoItem-sign todoItem-sign_checked": "todoItem-sign"}>
                                {this.props.item.completed ? "✔" : null} </div> 
                    </div>
                    <div 
                        onClick = {() => this.props.onItemSelected((this.props.item.id))}
                        className="todoItem-info">

                        <div   
                            className = {this.props.item.completed ? "todoItem-title todoItem-completed" : "todoItem-title"}>
                                {this.props.item.title}</div>
                        <div 
                            className = {this.props.item.completed ? "todoItem-descr todoItem-completed" : "todoItem-descr"}>
                                {this.props.item.description}</div>
                    </div>
                </div>
            </div>
        )
    }
}

