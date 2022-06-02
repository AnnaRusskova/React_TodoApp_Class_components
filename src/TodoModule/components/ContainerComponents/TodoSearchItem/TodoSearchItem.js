import './TodoSearchItem.css';
import { Component } from "react";

export class TodoSearchItem extends Component{
    render(){
        return (
            <div>
                <div className="todoSearchItem-line"></div>
                <form>
                    <input className="todoSearchItem-input" type="text" placeholder="Search"/>
                </form>
            </div>
        )
    }
}