import { Component } from "react";
import './HistoryItem.css';

export class HistoryItem extends Component{
    render(){
        return (
            <>
                <div className="historyItem">
                    <div className="historyItem-line"></div>
                    <div className="historyItem-info">
                        <div className="historyItem-text">{this.props.item.history[0].action}</div>
                        <div className="historyItem-time">{this.props.item.history[0].appliedAt}</div>
                    </div>
                </div>   
            </>
        )
    }
}