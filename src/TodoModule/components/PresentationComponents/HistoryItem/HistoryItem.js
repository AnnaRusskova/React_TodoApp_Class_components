import { Component } from "react";
import './HistoryItem.css';

export class HistoryItem extends Component {
    convertToReadableHistoryView = (historyItem) => {
        return `Що ж, станом на ${historyItem.appliedAt} було ${historyItem.action === "CREATED" ? 'створено' : 'оновлено'} ${historyItem.prevValue}`
    };

    render() {
        return (
            <>
                <div className="historyItem">
                    <div className={this.props.historyItem.action ? "historyItem-line" : null}></div>
                    <div className="historyItem-info">
                        
                        <div className="historyItem-text">{this.convertToReadableHistoryView(this.props.historyItem)}</div>
                        <div className="historyItem-text">{this.props.historyItem.prevValue}</div>
                        <div className="historyItem-text">{this.props.historyItem.currentValue}</div>
                        <div className="historyItem-time">{this.props.historyItem.appliedAt}</div>

                    </div>
                </div>   
            </>
        )
    }
}