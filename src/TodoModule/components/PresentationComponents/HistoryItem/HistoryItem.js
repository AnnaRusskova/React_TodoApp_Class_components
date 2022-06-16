import { Component } from "react";
import './HistoryItem.css';

const currentview = (value) =>{
    if(value === true){
        return 'completed';
    } else if(value === false){
        return 'not completed';
    } else {
        return value;
    } 
}
export class HistoryItem extends Component {
    convertToReadableHistoryView = (historyItem) => {
        if(historyItem.action === ''){
            return null
        } else{
            return `Todo-item ${historyItem.action === "CREATED" 
            ? 'was created as' 
            : 'was updated to'} "${currentview(historyItem.currentValue)}"`
        }
    };

    render() {
        return (
            <>
                <div className="historyItem">
                    <div className={this.props.historyItem.action ? "historyItem-line" : null}></div>
                    <div className="historyItem-info">  
                        <div className="historyItem-text">{this.convertToReadableHistoryView(this.props.historyItem)}</div>
                        <div className="historyItem-time">{this.props.historyItem.appliedAt}</div>
                    </div>
                </div>   
            </>
        )
    }
}