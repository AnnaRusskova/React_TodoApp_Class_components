import './TodoSearchItem.css';
import { Component } from "react";

export class TodoSearchItem extends Component{

    render(){
        return (
            <div>
                <div className="todoSearchItem-line"></div>
                <form onSubmit={this.props.onSearchSubmitHandler}>
                    <input 
                        className="todoSearchItem-input" 
                        type="text" 
                        placeholder="Search"
                        onChange = {this.props.onSearchTitleFilter}
                         />
                </form>
            </div>
        )
    }
}