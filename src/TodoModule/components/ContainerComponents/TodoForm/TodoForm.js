import { Component } from "react";
import './TodoForm.css';

export class TodoForm extends Component{

    render(){
        return (
            <div>
                <div className="todoForm-line"></div>
                <form className="todoForm" onSubmit={this.props.onFormSubmitHandler}>
                    <input className = "todoForm-input" 
                            type = "text"  
                            placeholder = "What you need to do?" 
                            value = {this.props.item.title}
                            onChange = {this.props.onTitleChangeHandler} 
                    ></input>


                    <button className="todoForm-btn">+</button>
                </form>
            </div>
        )
    }
}
