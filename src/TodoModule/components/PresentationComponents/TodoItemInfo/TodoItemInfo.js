import { Component } from "react";
import './TodoItemInfo.css';
import { HistoryItem } from "../HistoryItem/HistoryItem";


export class TodoItemInfo extends Component {
    render() {
        return (
            <div className="todoItemInfo">
                <h1 className="todoItemInfo-title">{this.props.item.title}</h1>
                <form onSubmit={this.props.onDescrSubmitHandler}>
                    <textarea
                        id="textarea"
                        defaultValue={this.props.item.description}
                        onChange={this.props.onDescrChangeHandler}
                        onSubmit={this.props.onDescrSubmitHandler}
                        className="todoItemInfo-textarea"
                        type="text"
                        placeholder="Type here...">
                    </textarea>
                    <button className="todoItemInfo-btn">Save</button>
                </form>

                <div className="todoItemHistory">
                    <h2 className="todoItemHistory_title">History</h2>
                    { this.props.item.history.map(historyRecord =>
                        <HistoryItem
                            key={historyRecord.id}
                            historyItem={historyRecord}
                        />)
                    }
                </div>
            </div>
        )
    }
}
