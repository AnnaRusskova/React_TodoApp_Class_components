import './TodoSearchItem.css';
import { Component } from "react";

export class TodoSearchBar extends Component{

    render(){
        return (
            <div>
                <div className="todoSearchItem-line"></div>
                <form onSubmit={(e) => e.preventDefault()}>
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