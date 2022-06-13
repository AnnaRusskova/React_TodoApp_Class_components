import { Component } from "react";
import './HistoryItem.css';

export class HistoryItem extends Component{
    render(){
        return (
            <>
                <div className="historyItem">
                    <div className={this.props.historyItem.action ? "historyItem-line" : null}></div>
                    <div className="historyItem-info">
                        
                        <div className="historyItem-text">{this.props.historyItem.action}</div>
                        <div className="historyItem-time">{this.props.historyItem.appliedAt}</div>

                    </div>
                </div>   
                
            </>
        )
    }
}