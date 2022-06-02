import { Component } from "react";
import './TodoEmptyPresentation.css';

export class TodoEmptyPresentation extends Component{
    render(){
        return(
            <div>
                <div className="todoEmpty-title">Nothing is selected</div>
            </div>
        )
    }
}